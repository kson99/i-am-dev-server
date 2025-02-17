const webPush = require("web-push");
require("dotenv").config();

// VAPID Keys (Replace with your generated keys)
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// Set VAPID details
webPush.setVapidDetails(
	"mailto:developer@i-am-dev.com",
	publicVapidKey,
	privateVapidKey
);

module.exports = { webPush };
