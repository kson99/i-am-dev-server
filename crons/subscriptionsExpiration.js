const db = require("../db");
const { sendNotification } = require("../utils");

module.exports = async () => {
  const notifications = [];

  // getting subscriptions that expire in 30 days
  const { rows: exp30daysList } = await db.query(`
        SELECT * FROM subscriptions WHERE renewal_date::DATE = CURRENT_DATE + INTERVAL '30 days'
        `);

  // if there are any projects
  if (exp30daysList.length > 0) {
    exp30daysList.map(
      ({ id, owner, product_name, plan_name, renewal_date }) => {
        notifications.push({
          user_id: owner,
          type: "subscriptions",
          title: "Subscription expires in 30 days",
          message: `Your ${product_name} subscription for ${plan_name} expires on ${new Date(
            renewal_date
          ).toLocaleString()}`,
          click_action: `/subscriptions/${id}`,
        });
      }
    );
  }

  // getting subscriptions that expire in 5 days
  const { rows: exp5daysList } = await db.query(`
        SELECT * FROM subscriptions WHERE renewal_date::DATE = CURRENT_DATE + INTERVAL '5 days'
        `);

  // if there are any projects
  if (exp5daysList.length > 0) {
    exp5daysList.map(({ id, owner, product_name, plan_name, renewal_date }) => {
      notifications.push({
        user_id: owner,
        type: "subscriptions",
        title: "Subscription expires in 5 days",
        message: `Your ${product_name} subscription for ${plan_name} expires on ${new Date(
          renewal_date
        ).toLocaleString()}`,
        click_action: `/subscriptions/${id}`,
      });
    });
  }

  // getting subscriptions that expire today
  const { rows: expTodayList } = await db.query(`
        SELECT * FROM subscriptions WHERE renewal_date::DATE = CURRENT_DATE
        `);

  // if there are any projects
  if (expTodayList.length > 0) {
    expTodayList.map(({ id, owner, product_name, plan_name, renewal_date }) => {
      notifications.push({
        user_id: owner,
        type: "subscriptions",
        title: "Subscription expires today",
        message: `Your ${product_name} subscription for ${plan_name} expires today (${new Date(
          renewal_date
        ).toLocaleString()})`,
        click_action: `/subscriptions/${id}`,
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
