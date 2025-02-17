const cron = require("node-cron");
const projectsAndTasksDueDates = require("./projectsAndTasksDueDates");

// * * * * *
// | | | | |
// | | | | └── Day of the week (0 - 7) (Sunday = 0 or 7)
// | | | └──── Month (1 - 12)
// | | └────── Day of the month (1 - 31)
// | └──────── Hour (0 - 23)
// └────────── Minute (0 - 59)

const everyMinute = "* * * * *";
const daily8AM = "0 8 * * *";
const dailyMidnight = "0 0 * * *";
const daily2_17 = "26 2 * * *";

module.exports = () => {
	// cron.schedule(everyMinute, async () => {
	// 	console.log("checking notifications!", new Date().toLocaleTimeString());
	// });

	// Daily 8 AM cron jobs
	cron.schedule(daily2_17, async () => {
		// Projects and task due dates
		projectsAndTasksDueDates();
	});
};
