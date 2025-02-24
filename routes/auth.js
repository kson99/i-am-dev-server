const express = require("express");
const passport = require("passport");
const db = require("../db");
const { passportAuthenticate } = require("../middleware/passportAuthentricate");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const router = express.Router();
require("dotenv").config();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    done(null, rows[0]);
  } catch (error) {
    done(error, null);
  }
});

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { avatar_url, email, name, id } = profile._json;
      let image = null;

      if (avatar_url) {
        image = {
          url: avatar_url,
          name: null,
          id: null,
        };
      }

      try {
        const { rows } = await db.query(
          `
					INSERT INTO users (name, image, email, provider, provider_user_id, role, status, last_login, created_on)
					VALUES ($1, $2, $3, $4, $5, 'standard', 'Requesting Access', NOW(), NOW())
					ON CONFLICT (email, provider_user_id)
					DO UPDATE SET
						name = EXCLUDED.name,
						provider = EXCLUDED.provider,
						last_login = EXCLUDED.last_login
						RETURNING *`,
          [name, image, email, "github", id]
        );

        const user = rows[0];
        return done(null, user);
      } catch (error) {
        console.log(error.message);

        return done(null, false, {
          message: "Authentication Error: " + error.message,
        });
      }
    }
  )
);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { picture, email, name, sub } = profile._json;
      let image = null;

      if (picture) {
        image = {
          url: picture,
          name: null,
          id: null,
        };
      }

      try {
        const { rows } = await db.query(
          `
					INSERT INTO users (name, image, email, provider, provider_user_id, role, status, last_login, created_on)
					VALUES ($1, $2, $3, $4, $5, 'standard', 'Requesting Access', NOW(), NOW())
					ON CONFLICT (email, provider_user_id)
					DO UPDATE SET
					name = EXCLUDED.name,
					provider = EXCLUDED.provider,
					last_login = EXCLUDED.last_login
					RETURNING *`,
          [name, image, email, "google", sub]
        );

        const user = rows[0];
        return done(null, user);
      } catch (error) {
        console.log(error);

        return done(null, false, {
          message: "Authentication Error: " + error.message,
        });
      }
    }
  )
);

// Github routes
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get("/github/callback", (req, res, next) => {
  passportAuthenticate(req, res, next, "github");
});

// Google routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", (req, res, next) => {
  passportAuthenticate(req, res, next, "google");
});

// Profile route (only accessible if authenticated)
router.get("/profile", (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error.message);
    res.redirect("/");
  }
});

// logout route
router.get("/logout", (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      req.session.destroy(() => {
        // Clear the session cookie (default name in `express-session`)
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Logout failed! " + error.message });
  }
});

module.exports = router;
