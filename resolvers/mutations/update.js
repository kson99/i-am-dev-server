const { cloudinary } = require("../../config/cloudinary");
const db = require("../../db");

// Updating project
const updateProject = async (_, { id, updates }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { image_removed = null, new_image = null, ...data } = updates;
    const fields = [];
    const values = [];

    // if there was an image remove
    if (image_removed) {
      await cloudinary.uploader.destroy(image_removed.id, _, (result) => {
        console.log(result);
      });

      data["image"] = null;
    }

    // On new Image upload
    if (new_image) {
      // uploading new image
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        new_image.url,
        {
          resource_type: "auto",
        }
      );

      data["image"] = {
        id: public_id,
        url: secure_url,
        name: new_image.filename,
      };
    }

    Object.keys(data).forEach((key, index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push(data[key]);
    });

    values.push(id);

    const { rows } = await db.query(
      `
      UPDATE projects SET ${fields.join(", ")}
      WHERE id = $${values.length}
      RETURNING *`,
      values
    );

    return rows[0];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed to update Project: " + error.message);
  }
};

// updating project hoste_at
const updateProjectHost = async (_, { id, projects }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const operation = projects.map(async (projectId) => {
      const { rows } = await db.query(
        `
				UPDATE projects 
				SET hosted_at = array_append(COALESCE(hosted_at, '{}'), $1)
				WHERE id = $2
				AND NOT ($1 = ANY(COALESCE(hosted_at, '{}')))
				RETURNING *;
				`,
        [Number(id), Number(projectId)]
      );

      return rows[0];
    });

    const returns = await Promise.all(operation);
    return returns;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed updating project host: " + error.message);
  }
};

// Updating task
const updateTask = async (_, { id, updates }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const fields = [];
    const values = [];

    Object.keys(updates).forEach((key, index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push(updates[key]);
    });

    values.push(id);

    const { rows } = await db.query(
      `
      UPDATE tasks SET ${fields.join(", ")}
      WHERE id = $${values.length}
      RETURNING *`,
      values
    );

    return rows[0];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed to updating Task: " + error.message);
  }
};

// Updating subtasks
const updateSubtasks = async (_, { subtasks }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const subtasksUpload = subtasks.map(
      async ({ id = null, title, completed, task_id }) => {
        if (id) {
          const { rows } = await db.query(
            "UPDATE subtasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
            [title, completed, id]
          );
          return rows[0];
        } else {
          const { rows } = await db.query(
            "INSERT INTO subtasks (task_id, title, completed) VALUES ($1, $2, $3) RETURNING *",
            [task_id, title, completed]
          );
          return rows[0];
        }
      }
    );

    const returns = await Promise.all(subtasksUpload);
    return returns;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed to create subtask: " + error.message);
  }
};

// Updating Client
const updateClient = async (_, { id, updates }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { logo_removed, new_logo, ...data } = updates;
    const fields = [];
    const values = [];

    // if there was an image remove
    if (logo_removed) {
      await cloudinary.uploader.destroy(logo_removed.id, (result) => {
        console.log(result);
      });

      data["logo"] = null;
    }

    // On new Image upload
    if (new_logo) {
      // uploading new image
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        new_logo.url,
        {
          resource_type: "auto",
        }
      );

      data["logo"] = {
        id: public_id,
        url: secure_url,
        name: new_logo.filename,
      };
    }

    Object.keys(data).forEach((key, index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push(data[key]);
    });

    values.push(id);

    const { rows } = await db.query(
      `
          UPDATE clients SET ${fields.join(", ")}
          WHERE id = $${values.length}
          RETURNING *`,
      values
    );

    return rows[0];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed Updating Client: " + error.message);
  }
};

// updating event
const updateEvent = async (_, { id, updates }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const fields = [];
    const values = [];

    Object.keys(updates).forEach((key, index) => {
      fields.push(`${key === "end" ? '"end"' : key} = $${index + 1}`);
      values.push(updates[key]);
    });
    values.push(id);

    const { rows } = await db.query(
      `
      UPDATE events SET ${fields.join(", ")}
      WHERE id = $${values.length}
      RETURNING *`,
      values
    );

    return rows[0];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed updating event: " + error.message);
  }
};

// updating Subscription
const updateSubscription = async (_, { id, updates }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { new_logo, logo_removed, ...data } = updates;

    const fields = [];
    const values = [];

    // if there was an image remove
    if (logo_removed) {
      await cloudinary.uploader.destroy(logo_removed.id, (result) => {
        console.log(result);
      });

      data["logo"] = null;
    }

    // On new Image upload
    if (new_logo) {
      // uploading new image
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        new_logo.url,
        {
          resource_type: "auto",
        }
      );

      data["logo"] = {
        id: public_id,
        url: secure_url,
        name: new_logo.filename,
      };
    }

    Object.keys(data).map((key, index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push(data[key]);
    });

    values.push(id);

    const { rows } = await db.query(
      `
				UPDATE subscriptions SET ${fields.join(", ")}
				WHERE id = $${values.length}
				RETURNING *
				`,
      values
    );

    return rows[0];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed to update Subscription: " + error.message);
  }
};

// Updating subscription logo
const updateSubscriptionLogo = async (_, { id, updates }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { logo_removed, new_logo } = updates;

    // if there was an image remove
    if (logo_removed) {
      await cloudinary.uploader.destroy(logo_removed.id, (result) => {
        console.log(result);
      });
    }

    // uploading new image
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      new_logo.url,
      {
        resource_type: "auto",
      }
    );

    const logo = {
      id: public_id,
      url: secure_url,
      name: new_logo.filename,
    };

    const { rows } = await db.query(
      "UPDATE subscriptions SET logo = $1 WHERE id = $2 RETURNING *",
      [logo, id]
    );

    return rows[0];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed updating logo: " + error.message);
  }
};

// Updating user image
const updateUserImage = async (_, { updates }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { new_image, image_removed } = updates;

    // removing old image from store
    if (image_removed) {
      await cloudinary.uploader.destroy(image_removed.id, _, (results) => {
        console.log("uploadCallback", results);
      });
    }

    // uploading new image
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      new_image.url,
      {
        resource_type: "auto",
      }
    );

    const image = {
      id: public_id,
      url: secure_url,
      name: new_image?.filename,
    };

    const { rows } = await db.query(
      "UPDATE users SET image = $1 WHERE id = $2 RETURNING *",
      [image, user.id]
    );

    return rows[0];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed Updating user: " + error.message);
  }
};

// updating user preferences
const updateUserPreferences = async (_, { updates }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { allow_notifications, notification_preferences } = updates;

    const { rows } = await db.query(
      `
			UPDATE users SET allow_notifications = $1, notification_preferences = $2
			WHERE id = $3
			RETURNING *`,
      [allow_notifications, notification_preferences, user.id]
    );

    // updating notification subscriptions
    const { rows: notifSub } = await db.query(
      "UPDATE notification_subscriptions SET preferences = $1, is_active = $2 WHERE user_id = $3",
      [notification_preferences, allow_notifications, user.id]
    );

    return rows[0];
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed updating user preferences: " + error.message);
  }
};

// updating user status
const updateUserStatus = async (_, { id, status }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  // authorizations
  if (user.role !== "admin") {
    throw new Error("User not auhtorized");
  }

  // Checking status validity
  const allowedStatuses = ["Active", "Disabled"];
  if (!allowedStatuses.includes(status)) {
    throw new Error("Status provided invalid");
  }

  try {
    const { rows } = await db.query(
      "UPDATE users SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    return rows[0];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed updating user status: " + error.message);
  }
};

// Updating notification viewed status
const updateNotificationViewed = async (_, { id }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      "UPDATE notifications SET viewed = TRUE WHERE id = $1",
      [id]
    );

    return rows[0];
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed updating notification viewed: " + error.message);
  }
};

module.exports = {
  updateProject,
  updateProjectHost,
  updateTask,
  updateSubtasks,
  updateClient,
  updateEvent,
  updateSubscription,
  updateSubscriptionLogo,
  updateUserImage,
  updateUserPreferences,
  updateUserStatus,
  updateNotificationViewed,
};
