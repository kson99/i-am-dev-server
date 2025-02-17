const cron = require("node-cron");
const eventsArrival = require("./eventsArrival");
const projectsAndTasksDueDates = require("./projectsAndTasksDueDates");
const subscriptionExpirations = require("./subscriptionsExpiration");

// * * * * *
// | | | | |
// | | | | └── Day of the week (0 - 7) (Sunday = 0 or 7)
// | | | └──── Month (1 - 12)
// | | └────── Day of the month (1 - 31)
// | └──────── Hour (0 - 23)
// └────────── Minute (0 - 59)

const everySecond = "* * * * * *";
const everyMinute = "* * * * *";
const daily8AM = "0 8 * * *";
const dailyMidnight = "0 0 * * *";

module.exports = () => {
  // Secondly cron jobs
  // cron.schedule(everySecond, async () => {
  //   // console.log("time");
  // });

  // Minutely cron jobs
  cron.schedule(everyMinute, async () => {
    await eventsArrival();
  });

  // Daily 8 AM cron jobs
  cron.schedule(daily8AM, async () => {
    // Projects and task due dates notifying
    await projectsAndTasksDueDates();
  });

  // Daily midnight cron jobs
  cron.schedule(dailyMidnight, async () => {
    // Subscriptions expiration notifying
    await subscriptionExpirations();
  });
};
