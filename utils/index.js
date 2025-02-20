const { webPush } = require("../config/webpush");
const db = require("../db");

const sendNotification = async (user_id, title, message, type, data) => {
  // Get all active subscriptions for user where notification type is allowed
  const { rows } = await db.query(
    "SELECT * FROM notification_subscriptions WHERE user_id = $1 AND is_active = TRUE",
    [user_id]
  );

  const filteredSubscriptions = rows.filter(
    ({ preferences }) => preferences[type]
  );

  // Handling not subscriptions available
  if (filteredSubscriptions.length === 0) {
    console.log(
      `No active subscriptions for this type or user disabled '${type}' notifications.`
    );
  }

  const notificationPayload = JSON.stringify({
    title,
    body: message,
    icon: "https://www.freeiconspng.com/thumbs/rocket-png/rocket-png-1.png",
    data,
  });

  const notificationSendPromise = filteredSubscriptions.map(
    ({ endpoint, keys, expirationTime }) => {
      webPush
        .sendNotification(
          {
            endpoint,
            keys,
            expirationTime,
          },
          notificationPayload
        )
        .catch((err) => {
          console.log("Push error: ", err);
        });
    }
  );

  await Promise.all(notificationSendPromise);
};

module.exports = {
  sendNotification,
};
