const db = require("../../db");

// Getting project stats
const stats = async (_, __, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows: projects } = await db.query("SELECT count(*) FROM projects");
    const { rows: projects_hired } = await db.query(
      "SELECT count(*) FROM projects WHERE type = 'Hired'"
    );
    const { rows: projects_collaborating } = await db.query(
      "SELECT count(*) FROM projects WHERE type = 'Collaborating'"
    );
    const { rows: projects_personal } = await db.query(
      "SELECT count(*) FROM projects WHERE type = 'Personal'"
    );
    const { rows: tasks } = await db.query("SELECT count(*) FROM tasks");

    return {
      projects_count: projects[0].count || 0,
      projects_hired: projects_hired[0].count || 0,
      projects_collaborating: projects_collaborating[0].count || 0,
      projects_personal: projects_personal[0].count || 0,
      tasks_count: tasks[0].count || 0,
    };
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting stats: " + error.message);
  }
};

// Getting All projects from db
const allProjects = async (_, __, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(`
      SELECT * FROM projects 
      ORDER BY id DESC`);

    return rows;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting all projects: " + error.message);
  }
};

// Getting paginated projects from db
const projects = async (_, { limit, offset }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(`
      SELECT * FROM projects 
      ORDER BY id DESC 
      LIMIT ${limit}
      OFFSET ${offset}`);

    return rows;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting projects: " + error.message);
  }
};

const projects_count = async (_, __, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query("SELECT count(*) FROM projects");

    return rows[0].count || 0;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting projects count: " + error.message);
  }
};

// getting important projects
const projectsByPriority = async (_, { priority }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      "SELECT * FROM projects WHERE priority = $1",
      [priority]
    );

    return rows;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting prioritized projects: " + error.message);
  }
};

// Getting project pinned to taskbar
const pinnedProjects = async (_, { pinned }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  const values = `(${pinned.join(", ")})`;

  try {
    if (pinned.length > 0) {
      const { rows } = await db.query(`
        SELECT * FROM projects 
        WHERE id IN ${values} ORDER BY name ASC `);

      return rows;
    }

    return [];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting pinned Projects: " + error.message);
  }
};

// getting project by id
const project = async (_, { id }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query("SELECT * FROM projects WHERE id = $1", [
      id,
    ]);

    return rows[0];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting project: " + error.message);
  }
};

// getting all tasks
const tasks = async (_, { limit, offset }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      `SELECT * FROM tasks 
      		ORDER BY id DESC 
      		LIMIT ${limit} 
      		OFFSET ${offset} `
    );

    return rows;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting tasks: " + error.message);
  }
};

// getting all tasks count
const tasks_count = async (_, __, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query("SELECT count(*) FROM tasks");

    return rows[0].count || 0;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting tasks count: " + error.message);
  }
};

// getting all subtasks
const subtasks = async (_, { id }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      "SELECT * FROM subtasks WHERE task_id = $1 ORDER BY id ASC",
      [id]
    );

    return rows;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting task subtasks: " + error.message);
  }
};

// getting project tasks
const projectTasks = async (_, { project_id }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      "SELECT * FROM tasks WHERE project_id = $1",
      [project_id]
    );

    return rows;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting project tasks: " + error.message);
  }
};

// getting all clients
const clients = async (_, { limit, offset }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(`
      SELECT * FROM clients 
      ORDER BY ID DESC
      LIMIT ${limit}
      OFFSET ${offset}`);

    return rows;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting clients: " + error.message);
  }
};

// Getting client By ID
const client = async (_, { id }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query("SELECT * FROM clients WHERE id = $1", [
      id,
    ]);

    return rows[0];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting Client: " + error.message);
  }
};

// Clients count
const clients_count = async (_, __, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query("SELECT count(*) FROM clients");

    return rows[0].count || 0;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed Getting clients_count: " + error.message);
  }
};

// getting events
const events = async (_, __, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      "SELECT * FROM events WHERE type = 'scheduled'"
    );

    return rows;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting events: " + error.message);
  }
};

// getting unscheduled events
const unscheduledEvents = async (_, __, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      "SELECT * FROM events WHERE type = 'unscheduled'"
    );

    return rows;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting unscheduled events: " + error.message);
  }
};

// getting subscriptions
const subscriptions = async (_, { filter, limit, offset }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      `SELECT * FROM subscriptions 
			ORDER BY renewal_date ASC
			LIMIT $1
			OFFSET $2`,
      [limit, offset]
    );

    return rows;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting subscriptions: " + error.message);
  }
};

// getting subscriptions count
const subscriptions_count = async (_, __, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query("SELECT count(*) FROM subscriptions");

    return rows[0].count || 0;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting subscriptions count: " + error.message);
  }
};

// getting subscriptions
const subscription = async (_, { id }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      "SELECT * FROM subscriptions WHERE id = $1",
      [id]
    );

    return rows[0];
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting subscription: " + error.message);
  }
};

// Searching functionality
const searchResults = async (_, { table, query, offset, limit }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const validTables = [
      "projects",
      "clients",
      "subscriptions",
      "tasks",
      "users",
    ];

    // Searchable fields oer table
    const searchables = {
      projects: `name ILIKE '%${query}%' OR  description ILIKE '%${query}%'`,
      clients: `name ILIKE '%${query}%' OR  email ILIKE '%${query}%'`,
      subscriptions: `product_name ILIKE '%${query}%' OR  description ILIKE '%${query}%' OR plan_name ILIKE '%${query}%'`,
      tasks: `title ILIKE '%${query}%' OR  description ILIKE '%${query}%'`,
      users: `name ILIKE '%${query}%' OR  email ILIKE '%${query}%'`,
    };

    // Check if table is amongst allowed tables
    if (!validTables.includes(table)) {
      throw new Error(`Invalid table: ${table}`);
    }

    const { rows } = await db.query(`
			SELECT * FROM ${table}
			WHERE ${searchables[table]}
			LIMIT ${limit}
			OFFSET ${offset}
			`);

    const { rows: count } = await db.query(`
				SELECT count(*) FROM ${table}
				WHERE ${searchables[table]}
				`);

    return { table, data: rows, count: count[0].count || 0 };
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed Searching: " + error.message);
  }
};

// Getting active user
const user = async (_, __, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    return user;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting user: " + error.message);
  }
};

// Getting users
const users = async (_, { limit, offset }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      "SELECT * FROM users WHERE status != $1 LIMIT $2 OFFSET $3",
      ["Requesting Access", limit, offset]
    );

    return rows;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting users: " + error.message);
  }
};

// getting users count
const users_count = async (_, __, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      "SELECT count(*) FROM users WHERE status != $1",
      ["Requesting Access"]
    );

    return rows[0].count || 0;
  } catch (error) {
    console.log(error.message);

    throw new Error("Failed getting users count: " + error.message);
  }
};

// getting users requesting access
const users_requsting_access = async (_, { limit, offset }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  if (user.role !== "admin") {
    throw new Error("User not auhtorized");
  }

  try {
    const { rows } = await db.query(
      "SELECT * FROM users WHERE status = $1 LIMIT $2 OFFSET $3",
      ["Requesting Access", limit, offset]
    );

    return rows;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed getting users requesting access: " + error.message);
  }
};

// getting users requesting access count
const users_requsting_access_count = async (_, __, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  try {
    const { rows } = await db.query(
      "SELECT count(*) FROM users WHERE status = $1",
      ["Requesting Access"]
    );

    return rows[0].count || 0;
  } catch (error) {
    console.log(error.message);
    throw new Error(
      "Failed getting users requesting access count: " + error.message
    );
  }
};

// getting notifications
const notifications = async (_, { type, limit, offset }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  let filter = "type ILIKE $2";
  let value = "%%";

  if (!["", "all"].includes(type)) {
    if (type === "unread") {
      filter = `viewed = $2`;
      value = false;
    } else {
      value = `%${type}%`;
    }
  }

  try {
    const { rows } = await db.query(
      `SELECT * FROM notifications 
			WHERE user_id = $1 
			AND ${filter}
			ORDER BY created_at DESC  
			LIMIT $3 
			OFFSET $4`,
      [user.id, value, limit, offset]
    );

    return rows;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed getting notifications: " + error.message);
  }
};

const notifications_count = async (_, { type }, { user }) => {
  // authentication
  if (!user) {
    throw new Error("User not logged In");
  }

  let filter = "type ILIKE $2";
  let value = "%%";

  if (!["", "all"].includes(type)) {
    if (type === "unread") {
      filter = `viewed = $2`;
      value = false;
    } else {
      value = `%${type}%`;
    }
  }

  try {
    const { rows } = await db.query(
      `SELECT count(*) FROM notifications 
	  WHERE user_id = $1
	 AND ${filter} 
	  `,
      [user.id, value]
    );

    return rows[0].count || 0;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed getting notifications count: " + error.message);
  }
};

module.exports = {
  stats,
  allProjects,
  projects,
  projects_count,
  pinnedProjects,
  project,
  projectsByPriority,
  tasks,
  tasks_count,
  subtasks,
  projectTasks,
  clients,
  clients_count,
  client,
  events,
  unscheduledEvents,
  subscriptions,
  subscriptions_count,
  subscription,
  searchResults,
  user,
  users,
  users_count,
  users_requsting_access,
  users_requsting_access_count,
  notifications,
  notifications_count,
};
