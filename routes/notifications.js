const express = require("express");
const db = require("../db");
const { webPush } = require("../config/webpush");
const { sendNotification } = require("../utils");
const router = express.Router();

// Route to subscribe for push notifications
router.post("/subscribe", async (req, res) => {
  try {
    // authentication
    if (!req.isAuthenticated()) {
      throw new Error("User not logged In");
    }

    const { subscription, preferences, is_active } = req.body;
    const { endpoint, keys, expirationTime } = subscription;
    const userAgent = req.headers["user-agent"];
    const deviceType = /mobile/i.test(userAgent) ? "mobile" : "desktop";

    const { rows } = await db.query(
      `
			INSERT INTO notification_subscriptions 
			(user_id, endpoint, expiration_time, keys, user_agent, device_type, preferences, is_active) 
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
			ON CONFLICT (endpoint)
			DO UPDATE SET 
				user_id = $1,
				preferences = $7, 
				is_active = $8, 
				updated_at = NOW()
			RETURNING *`,
      [
        req.user.id,
        endpoint,
        expirationTime,
        keys,
        userAgent,
        deviceType,
        preferences,
        is_active,
      ]
    );

    res.status(201).json({
      message: "Subscribed Successfully",
      data: rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Failed subscribing to notification",
      error: error.message,
    });
  }
});

// Route to send push notification
router.post("/send", async (req, res) => {
  try {
    // authentication
    if (!req.isAuthenticated()) {
      throw new Error("User not logged In");
    }

    const { user_id, type, title, message } = req.body;

    await sendNotification(user_id, title, message, type, {
      click_action: "/notifications",
    });
    res.status(200).json({ message: "Notifications send!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Failed sending notification",
      error: error.message,
    });
  }
});

// route to get unread notifications count
router.get("/count", async (req, res) => {
  try {
    // authentication
    if (!req.isAuthenticated()) {
      throw new Error("User not logged In");
    }

    const { rows } = await db.query(
      "SELECT count(*) FROM notifications WHERE viewed = FALSE AND user_id = $1",
      [req.user.id]
    );

    res.status(200).send(rows[0].count || 0);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Failed getting notifications count",
      error: error.message,
    });
  }
});

module.exports = router;
