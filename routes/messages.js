const express = require("express");
const db = require("../db");
const { sendNotification } = require("../utils");
const router = express.Router();

router.post("/contactUs", async (req, res) => {
  try {
    const { name, email, subject, message, site } = req.body;

    // Check if site is available in contact us sites
    const { rows: pagesList } = await db.query(
      "SELECT id, owner, site_name FROM contact_us_pages WHERE site = $1",
      [site]
    );

    // If length is 0
    if (pagesList.length === 0) {
      throw new Error("Website not in contact us page list.");
    }

    const { id: site_id, owner, site_name } = pagesList[0];
    // Adding message to database
    const { rows: messages } = await db.query(
      `
      INSERT INTO messages 
      (site_id, name, email, subject, message, type, is_read, created_at)
      VALUES ($1, $2, $3, $4, $5, 'Web', FALSE, NOW())
      RETURNING *
      `,
      [site_id, name, email, subject, message]
    );

    // Adding notification to database
    await db.query(
      "INSERT INTO notifications (user_id, viewed, type, title, message, click_action, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())",
      [
        owner,
        false,
        "messages",
        `Message from ${site_name}`,
        message,
        `/messages/${site_id}?tab=Web`,
      ]
    );

    // Sending notification
    await sendNotification(
      owner,
      `Message from ${site_name}`,
      message,
      "messages",
      {
        click_action: `/messages/${site_id}?tab=Web`,
      }
    );

    res.status(200).json({
      message: "Message send successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Failed adding contact us info.",
      error: error.message,
    });
  }
});

module.exports = router;
