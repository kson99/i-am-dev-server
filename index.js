const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const { gqlServer } = require("./config/graphql");
const { createTables } = require("./db/tables");
const cronOperations = require("./crons");

require("dotenv").config();

(async () => {
  // Starting the Appolo server
  await gqlServer.start();

  const app = express(); // Setting up Express App
  cronOperations(); //Running cron operations

  // Middlewares
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, // Security feature: can't be accessed via JavaScript
        secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
        maxAge: 1000 * 60 * 60 * 24, // 1 day session duration
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Setting up auth middleware
  const authRoutes = require("./routes/auth");
  const notificationRoutes = require("./routes/notifications");
  const messagesRoutes = require("./routes/messages");

  app.use("/auth", authRoutes);
  app.use("/notification", notificationRoutes);
  app.use("/messages", messagesRoutes);

  // Applying Apollo middleware with Express
  app.use(
    "/api/graphql",
    expressMiddleware(gqlServer, {
      context: async ({ req, res }) => {
        if (req.isAuthenticated()) {
          return { user: req.user, req, res };
        }

        return { user: null, req };
      },
    })
  );

  // Create tables if not exists route
  app.get("/createTables", createTables);

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/api`);
  });
})();
