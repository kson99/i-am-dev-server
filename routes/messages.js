const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/contactUs", async (req, res) => {
  try {
    const { name, email, subject, message, site } = req.body;

    // Check if site is available in contact us sites
    const { rows: pagesList } = await db.query(
      "SELECT id FROM contact_us_pages WHERE site = $1",
      [site]
    );

    // If length is 0
    if (pagesList.length === 0) {
      throw new Error("Website not in contact us page list.");
    }

    const site_id = pagesList[0]?.id;
    await db.query(
      `
      INSERT INTO messages 
      (site_id, name, email, subject, message, type, is_read, created_at)
      VALUES ($1, $2, $3, $4, $5, 'Web', FALSE, NOW())
      `,
      [site_id, name, email, subject, message]
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
