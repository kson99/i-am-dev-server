const db = require("../db");
const { sendNotification } = require("../utils");

module.exports = async () => {
  const notifications = [];

  // Events 15 minutes away
  const { rows: eventsIn15minutes } = await db.query(
    `
        SELECT * FROM events
        WHERE start = date_trunc('minute', NOW()) + INTERVAL '15 minutes';  
        `
  );

  //   if there are any events starting in 15 minutes
  if (eventsIn15minutes.length > 0) {
    eventsIn15minutes.map(({ title, start, owner }) => {
      notifications.push({
        user_id: owner,
        type: "events",
        title: "Event in 15 minutes",
        message: `Your event '${title}' starts at ${new Date(
          start
        ).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}. Be ready! ⏳`,
        click_action: "/calendar",
      });
    });
  }

  // Events starting now
  const { rows: nowEvents } = await db.query(`
    SELECT * FROM events 
    WHERE start = date_trunc('minute', NOW())
    `);

  // if there are any events starting now
  if (nowEvents.length > 0) {
    nowEvents.map(({ title, start, owner }) => {
      notifications.push({
        user_id: owner,
        type: "events",
        title: "Event starts now",
        message: `Your event '${title}' starts now ${new Date(
          start
        ).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}. 🚀`,
        click_action: "/calendar",
      });
    });
  }

  // sending notifications
  const notificationsSendPromise = notifications.map(
    async ({ user_id, title, message, type, click_action }) => {
      await db.query(
        "INSERT INTO notifications (user_id, viewed, type, title, message, click_action, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())",
        [user_id, false, type, title, message, click_action]
      );

      await sendNotification(user_id, title, message, type, {
        click_action,
      });
    }
  );
  await Promise.all(notificationsSendPromise);
};
