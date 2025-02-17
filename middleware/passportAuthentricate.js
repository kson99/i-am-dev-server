const passport = require("passport");

const passportAuthenticate = async (req, res, next, strategy) => {
	passport.authenticate(strategy, (err, user, info) => {
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
			return res.redirect(
				`${process.env.FRONTEND_URL}/auth?message=success`
			);
		});
	})(req, res, next);
};

module.exports = { passportAuthenticate };
