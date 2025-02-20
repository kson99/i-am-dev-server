const db = require("../../db");

// Relational functions for a statsObject
const Stats = {
  async projects_completed(props) {
    // getting all project ids
    const { rows: projects } = await db.query("SELECT id FROM projects");
    let completed = 0;

    if (projects.length > 0) {
      const ids = [];
      projects.map(({ id }) => ids.push(id));

      await Promise.all(
        ids.map(async (id) => {
          // Getting all tasks for project id
          const { rows: tasks } = await db.query(
            "SELECT id FROM tasks WHERE id = $1",
            [id]
          );

          if (tasks.length > 0) {
            const tasks_ids = [];
            tasks.map(({ id }) => tasks_ids.push(id));

            // finding subtasks not completed
            const { rows } = await db.query(
              `SELECT count(*) FROM subtasks
            WHERE task_id IN (${tasks_ids.join(", ")})`
            );

            // if there a subtask not complete
            if (rows[0].count === "0" || rows[0].count === null) {
              const { rows: any } = await db.query(
                `SELECT count(*) FROM subtasks
              WHERE task_id IN (${tasks_ids.join(", ")})`
              );

              if (any[0].count !== "0") {
                completed += 1;
              }
            }
          }
        })
      );
    }

    return completed;
  },

  async tasks_completed() {
    const { rows: tasks } = await db.query("SELECT id FROM tasks");
    let completed = 0;

    if (tasks.length > 0) {
      const tasks_ids = [];
      tasks.map(({ id }) => tasks_ids.push(id));

      await Promise.all(
        tasks_ids.map(async (id) => {
          const { rows } = await db.query(
            `
            SELECT count(*) FROM subtasks
            WHERE task_id = $1
            AND completed = false
            `,
            [id]
          );

          if (rows[0].count === "0" || rows[0].count === null) {
            const { rows: any } = await db.query(
              `
              SELECT count(*) FROM subtasks
            WHERE task_id = $1
              `,
              [id]
            );

            if (any[0].count !== "0") {
              completed += 1;
            }
          }
        })
      );
    }

    return completed;
  },
};

// Relational functions for a projectObject
const Project = {
  async tasks({ id }) {
    const priorityOrder = ["High", "Medium", "Normal", "Low", "Optional"];

    const { rows } = await db.query(
      "SELECT * FROM tasks WHERE project_id = $1 ORDER BY id ASC",
      [id]
    );

    let tasks =
      rows?.sort((a, b) => {
        return (
          priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
        );
      }) || [];

    return tasks;
  },

  async tasks_count({ id }) {
    const { rows } = await db.query(
      "SELECT count(*) FROM tasks WHERE project_id = $1",
      [id]
    );

    return rows[0].count || 0;
  },

  async tasks_completed({ id }) {
    let completed = 0;

    const { rows } = await db.query(
      "SELECT id FROM tasks WHERE project_id = $1",
      [id]
    );

    if (rows.length > 0) {
      const tasks = [];
      rows.map(({ id }) => tasks.push(id));

      await Promise.all(
        tasks.map(async (id) => {
          const { rows: subtasks } = await db.query(
            `
            SELECT count(*) FROM subtasks 
            WHERE task_id = $1 AND completed = false`,
            [id]
          );

          if (subtasks[0].count === "0") {
            const { rows: any } = await db.query(
              `
              SELECT count(*) FROM subtasks 
              WHERE task_id = $1`,
              [id]
            );

            if (any[0].count !== "0") {
              completed += 1;
            }
          }
        })
      );
    }

    return completed;
  },

  async status({ id }) {
    const { rows } = await db.query(
      "SELECT id FROM tasks WHERE project_id = $1",
      [id]
    );

    if (rows.length > 0) {
      const values = [];
      rows.map(({ id }) => values.push(id));

      const { rows: rows2 } = await db.query(`
        SELECT count(*) FROM subtasks 
        WHERE task_id IN (${values.join(", ")}) AND completed = false`);

      if (rows2[0].count) {
        return "In Progress";
      }

      return "Completed";
    }

    return "New";
  },

  async comments({ id }) {
    const { rows } = await db.query(
      "SELECT * FROM comments WHERE project_id = $1 ORDER BY id ASC",
      [id]
    );

    return rows;
  },

  async comments_count({ id }) {
    const { rows } = await db.query(
      "SELECT COUNT(*) FROM comments WHERE project_id = $1",
      [id]
    );

    return rows[0].count || 0;
  },

  async attachments({ id }) {
    const { rows } = await db.query(
      "SELECT * FROM attachments WHERE project_id = $1",
      [id]
    );

    return rows;
  },

  async attachments_count({ id }) {
    const { rows } = await db.query(
      "SELECT COUNT(*) FROM attachments WHERE project_id = $1",
      [id]
    );

    return rows[0].count || 0;
  },

  async client({ client_id }) {
    const { rows } = await db.query("SELECT * FROM clients where id = $1", [
      client_id,
    ]);

    return rows[0];
  },
};

// Relational functions for a taskObject
const Task = {
  async project({ project_id }) {
    const { rows } = await db.query("SELECT * FROM projects WHERE id = $1", [
      project_id,
    ]);

    return rows[0];
  },

  async subtasks({ id }) {
    const { rows } = await db.query(
      "SELECT * FROM subtasks WHERE task_id = $1 ORDER BY id ASC",
      [id]
    );

    return rows || [];
  },

  async subtasks_count({ id }) {
    const { rows } = await db.query(
      "SELECT count(*) FROM subtasks WHERE task_id = $1",
      [id]
    );

    return rows[0].count || 0;
  },

  async subtasks_completed({ id }) {
    const { rows } = await db.query(
      "SELECT count(*) FROM subtasks WHERE task_id = $1 AND completed = true",
      [id]
    );

    return rows[0].count || 0;
  },
};

// Relational functions for a clientObject
const Client = {
  async projects({ id }) {
    const { rows } = await db.query(
      "SELECT * FROM projects WHERE client_id = $1",
      [id]
    );

    return rows || [];
  },

  async projects_count({ id }) {
    const { rows } = await db.query(
      "SELECT count(*) FROM projects WHERE client_id = $1",
      [id]
    );

    return rows[0].count || 0;
  },
};

// Relational functions for SubscriptionObject
const Subscription = {
  async logo({ product_name }) {
    const { rows } = await db.query(`
      SELECT logo FROM subscriptions 
      WHERE product_name ILIKE '%${product_name}%' AND logo IS NOT NULL
      `);

    if (rows?.length > 0) {
      return rows[0].logo;
    }

    return null;
  },

  async status({ renewal_date, status }) {
    if (status) {
      return status;
    }

    if (new Date(Number(renewal_date)) < new Date()) {
      return "expired";
    }

    if (new Date(Number(renewal_date)) > new Date()) {
      return "active";
    }
  },

  async projects({ id }) {
    const { rows } = await db.query(
      `SELECT * FROM projects WHERE '${id}' = ANY(hosted_at)`
    );

    return rows || [];
  },

  async projects_count({ id }) {
    const { rows } = await db.query(
      `SELECT count(*) FROM projects WHERE '${id}' = ANY(hosted_at)`
    );

    return rows[0].count || 0;
  },
};

// Relational functions for ProjectComment
const ProjectComment = {
  async user({ user_id }) {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [
      user_id,
    ]);

    return rows[0];
  },
};

// Relational functions for SearchResults
const SearchResults = {
  async data({ table, data }) {
    const newData = await Promise.all(
      data.map(async (item) => {
        switch (table) {
          case "projects":
            const tasks_count = await Project.tasks_count(item);
            const tasks_completed = await Project.tasks_completed(item);
            const attachments_count = await Project.attachments_count(item);
            const status = await Project.status(item);
            const comments_count = await Project.comments_count(item);

            return {
              ...item,
              tasks_count,
              tasks_completed,
              attachments_count,
              status,
              comments_count,
            };

          case "tasks":
            const subtasks_count = await Task.subtasks_count(item);
            const subtasks_completed = await Task.subtasks_completed(item);
            const project = await Task.project(item);

            return {
              ...item,
              subtasks_count,
              subtasks_completed,
              project,
            };

          case "clients":
            const projects_count = await Client.projects_count(item);

            return { ...item, projects_count };

          case "subscriptions":
            const sub_projects_count = await Subscription.projects_count(item);
            const sub_status = await Subscription.status(item);
            const sub_logo = await Subscription.logo(item);

            return {
              ...item,
              projects_count: sub_projects_count,
              logo: sub_logo,
              status: sub_status,
            };

          case "users":
            return { ...item };

          default:
            return;
        }
      })
    );

    return newData;
  },
};

// Relational ductions for Notification Sub
const NotificationSub = {
  async preferences({ user_id }) {
    const { rows } = await db.query(
      "SELECT notification_preferences FROM users WHERE id = $1",
      [user_id]
    );

    return rows[0].notification_preferences;
  },
};

// Relational functions for Chat
const Chat = {
  async last_message({ id, type }) {
    if (type === "Web") {
      const { rows } = await db.query(
        "SELECT message, created_at FROM messages WHERE site_id = $1 ORDER BY id, created_at DESC LIMIT 1",
        [id]
      );

      return {
        message: rows[0]?.message,
        timestamp: rows[0]?.created_at,
      };
    } else {
      const { rows } = await db.query(
        "SELECT message, created_at FROM messages WHERE chat_id = $1 ORDER BY id, created_at DESC LIMIT 1",
        [id]
      );

      return {
        message: rows[0]?.message,
        timestamp: rows[0]?.created_at,
      };
    }
  },

  async unread_count({ id, type }) {
    if (type === "Web") {
      const { rows } = await db.query(
        "SELECT count(*) FROM messages WHERE is_read = FALSE AND site_id = $1",
        [id]
      );

      return rows[0]?.count || 0;
    } else {
      const { rows } = await db.query(
        "SELECT count(*) FROM messages WHERE is_read = FALSE AND chat_id = $1",
        [id]
      );

      return rows[0]?.count || 0;
    }
  },

  async messages({ id, type }) {
    if (type === "Web") {
      const { rows } = await db.query(
        `SELECT * FROM messages WHERE site_id = $1 AND type = $2 ORDER BY created_at DESC`,
        [id, type]
      );

      return rows;
    } else {
      const { rows } = await db.query(
        "SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at DESC ",
        [id]
      );

      return rows;
    }
  },
};

module.exports = {
  Stats,
  Project,
  Task,
  Client,
  Subscription,
  ProjectComment,
  SearchResults,
  NotificationSub,
  Chat,
};
