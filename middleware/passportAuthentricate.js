const passport = require("passport");
const db = require("../db");
const { sendNotification } = require("../utils");

const passportAuthenticate = async (req, res, next, strategy) => {
  passport.authenticate(strategy, async (err, user, info) => {
    //Handling internal servers errors
    if (err) return next(err);

    // handling invalid credentials
    if (!user) {
      return res
        .status(401)
        .json({ message: info.message || "Invalid credentials" });
    }

    // For users requesting access
    if (user?.status === "Requesting Access") {
      // Check if notification for access request has been sent
      const { rows: notified } = await db.query(
        `
		SELECT 1 FROM notifications 
		WHERE sender_id = $1
		`,
        [user.id]
      );

      /* If not notification has been sent
		Then send notification */
      if (notified.length === 0) {
        // getting admins
        const { rows } = await db.query(
          "SELECT id FROm users WHERE role = 'admin'"
        );

        const promisRequest = rows.map(async (id) => {
          // inserting notification into notification's table
          await db.query(
            `
				INSERT INTO notifications 
				(user_id, viewed, type, title, message, click_action, created_at, sender_id)
				VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)`,
            [
              id,
              false,
              "access_request",
              "User Requesting Access!",
              `'${user.name}' is requesting access to the system.`,
              "users/access_requests",
              user.id,
            ]
          );

          // Sending notification
          await sendNotification(
            id,
            "User Requesting Access!",
            `'${user.name}' is requesting access to the system.`,
            "access_request",
            { click_action: "users/access_requests" }
          );
        });

        // Notification send promise
        await Promise.all(promisRequest);
      }

      return res.redirect(
        `${process.env.FRONTEND_URL}/auth?message=${encodeURIComponent(
          "reaquesting access"
        )}`
      );
    }

    // For users disabled
    if (user?.status === "Disabled") {
      return res.redirect(
        `${process.env.FRONTEND_URL}/auth?message=${encodeURIComponent(
          "account disabled"
        )}`
      );
    }

    // Logging in user on authentication success
    req.logIn(user, (error) => {
      if (error) return next(error);
      return res.redirect(`${process.env.FRONTEND_URL}/auth?message=success`);
    });
  })(req, res, next);
};

module.exports = { passportAuthenticate };
