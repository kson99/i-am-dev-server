const { cloudinary } = require("../../config/cloudinary");
const db = require("../../db");

// Creating a project
const createProject = async (_, { project }, { user }) => {
	// authentication
	if (!user) {
		throw new Error("User not logged In");
	}

	try {
		const created = new Date().toISOString();
		const data = { ...project, created };
		data["dates"] = {
			...project.dates,
			start: new Date(),
		};

		if (project.image) {
			const { url, filename } = project.image;

			// Upload image and get url
			const { secure_url, public_id } = await cloudinary.uploader.upload(
				url,
				{
					resource_type: "auto",
				}
			);

			data["image"] = {
				id: public_id,
				url: secure_url,
				name: filename,
			};
		}

		const fields = [];
		const values = [];
		const places = Object.keys(data)
			.map((_, i) => `$${i + 1}`)
			.join(", ");

		Object.keys(data).map((key) => {
			fields.push(key);
			values.push(data[key]);
		});

		const { rows } = await db.query(
			`INSERT INTO projects (${fields.join(", ")})
       		VALUES (${places})
       		RETURNING *`,
			values
		);

		return rows[0];
	} catch (error) {
		console.log(error);

		throw new Error("Failed to create project: " + error.message);
	}
};

// Creating a task
const createTask = async (_, { task }, { user }) => {
	// authentication
	if (!user) {
		throw new Error("User not logged In");
	}

	try {
		const fields = [];
		const values = [];
		const data = { ...task };
		data["status"] = "In Progress";
		const places = Object.keys(data)
			.map((_, i) => `$${i + 1}`)
			.join(", ");

		Object.keys(data).map((key) => {
			fields.push(key), values.push(data[key]);
		});

		const { rows } = await db.query(
			`INSERT INTO tasks (${fields.join(", ")})
      		VALUES (${places})
      		RETURNING *
      	`,
			values
		);

		return rows[0];
	} catch (error) {
		console.log(error.message);

		throw new Error("Failed to create task: " + error.message);
	}
};

// Creating comments
const createComment = async (_, { comment }, { user }) => {
	// authentication
	if (!user) {
		throw new Error("User not logged In");
	}

	try {
		const fields = [...Object.keys(comment)];
		const places = fields.map((f, i) => `$${i + 1}`).join(", ");
		const values = [...Object.values(comment)];

		const { rows } = await db.query(
			`INSERT INTO comments (${fields.join(", ")})
      VALUES (${places})
      RETURNING *`,
			values
		);

		return rows[0];
	} catch (error) {
		console.log(error.message);

		throw new Error("Failed to create comment: " + error.message);
	}
};

// Creating attachmnet
const createAttachment = async (_, { attachment }, { user }) => {
	// authentication
	if (!user) {
		throw new Error("User not logged In");
	}

	const { filename, url, project_id } = attachment;

	try {
		// Upload Attachment
		const { public_id, secure_url, format } =
			await cloudinary.uploader.upload(url, {
				resource_type: "auto",
				access_mode: "public",
			});

		const { rows } = await db.query(
			`
      INSERT INTO attachments (name, url, type, project_id, id) 
      values ($1, $2, $3, $4, $5)
      RETURNING *`,
			[filename, secure_url, format, project_id, public_id]
		);

		return rows[0];
	} catch (error) {
		console.log(error.message);

		throw new Error("Failed to create attachment: " + error.message);
	}
};

// Adding a new client
const createClient = async (_, { client }, { user }) => {
	// authentication
	if (!user) {
		throw new Error("User not logged In");
	}

	// const { name, email, logo, location, contact, address } = client;
	// const { name, email, logo, location, contact, address } = client;

	try {
		const data = { ...client };

		if (client.logo) {
			// Upload image and get url
			const { secure_url, public_id } = await cloudinary.uploader.upload(
				client.logo.url,
				{
					resource_type: "auto",
				}
			);

			data["logo"] = {
				url: secure_url,
				name: client.logo.filename,
				id: public_id,
			};
		}

		const fields = [];
		const values = [];
		const places = Object.keys(data)
			.map((_, i) => `$${i + 1}`)
			.join(", ");

		Object.keys(data).map((key) => {
			fields.push(key);
			values.push(data[key]);
		});

		const { rows } = await db.query(
			`
    		INSERT INTO clients (${fields.join(", ")})
            VALUES (${places})
            RETURNING *`,
			values
		);

		return rows[0];
	} catch (error) {
		console.log(error.message);

		throw new Error("Failed to create CLient: " + error.message);
	}
};

// Creating new event
const createEvent = async (_, { event }, { user }) => {
	// authentication
	if (!user) {
		throw new Error("User not logged In");
	}

	try {
		const fields = [];
		const values = [];
		const data = { ...event };
		const places = Object.keys(data)
			.map((_, i) => `$${i + 1}`)
			.join(", ");

		Object.keys(data).map((key) => {
			fields.push(key === "end" ? '"end"' : key);
			values.push(data[key]);
		});

		const { rows } = await db.query(
			`
      		INSERT INTO events (${fields.join(", ")})
      		VALUES (${places})
      		RETURNING *`,
			values
		);

		return rows[0];
	} catch (error) {
		console.log(error.message);

		throw new Error("Failed to create event: " + error.message);
	}
};

// Creating new subscription
const createSubscription = async (_, { subscription }, { user }) => {
	// authentication
	if (!user) {
		throw new Error("User not logged In");
	}

	try {
		const fields = [];
		const places = [];
		const values = [];

		Object.keys(subscription).forEach((key, i) => {
			fields.push(key);
			places.push(`$${i + 1}`);
			values.push(subscription[key]);
		});

		const { rows } = await db.query(
			`
      INSERT INTO subscriptions (${fields.join(", ")})
      VALUES (${places.join(", ")})
      RETURNING *`,
			values
		);

		return rows[0];
	} catch (error) {
		console.log(error.message);

		throw new Error("Failed creating subscription: " + error.message);
	}
};

module.exports = {
	createProject,
	createTask,
	createComment,
	createAttachment,
	createClient,
	createEvent,
	createSubscription,
};
