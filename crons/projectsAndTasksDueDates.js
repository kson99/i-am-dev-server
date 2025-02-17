const db = require("../db");
const { sendNotification } = require("../utils");

module.exports = async () => {
	const notifications = [];

	// Projects due in 5 days
	const { rows: projects } = await db.query(
		"SELECT * FROM projects WHERE (dates->>'due')::DATE = CURRENT_DATE + INTERVAL '5 days'"
	);

	// if projects length is greater than 0
	if (projects.length > 0) {
		projects.map(({ id, owner, name, image }) => {
			notifications.push({
				user_id: owner,
				type: "projects",
				title: "5 days left",
				message: `Time is running out, 5 days remaining on project '${name}'.`,
				click_action: `/projects/${id}`,
			});
		});
	}

	// projects due today
	const { rows } = await db.query(
		"SELECT * FROM projects WHERE (dates->>'due')::DATE = CURRENT_DATE"
	);

	if (rows.length > 0) {
		rows.map(({ id, owner, name, image }) => {
			notifications.push({
				user_id: owner,
				type: "projects",
				title: "Project due today",
				message: `Time is running out, Your '${name}' project is due today.`,
				click_action: `/projects/${id}`,
			});
		});
	}

	// get tasks not completed ids
	const { rows: tasksAvail } = await db.query(`
		SELECT task_id
		FROM subtasks
		WHERE completed = FALSE
		GROUP BY task_id
		`);

	if (tasksAvail.length > 0) {
		// picking out only incomplete tasks
		const tasksIds = tasksAvail.map(({ task_id }) => task_id);

		// tasks due in today
		const { rows: tasks } = await db.query(
			"SELECT * FROM tasks WHERE due_date::DATE = CURRENT_DATE AND id = ANY($1)",
			[tasksIds]
		);

		// if tasks length is greater than 0
		if (tasks.length > 0) {
			// create an object with owner as key
			let tasksObj = {};
			tasks.map(({ owner }) => {
				if (!tasksObj[owner]) {
					tasksObj[owner] = 0;
				}

				tasksObj[owner] += 1;
			});

			// map over owner and create noticications
			Object.keys(tasksObj).map((key) => {
				notifications.push({
					user_id: key,
					type: "tasks",
					title: "Tasks due today",
					message: `Time is running out, You have ${tasksObj[key]} tasks due today.`,
					click_action: `/tasks`,
				});
			});
		}
	}

	// sending notifications
	const notificationsSendPromise = notifications.map(
		async ({ user_id, title, message, type, click_action }) => {
			await db.query(
				"INSERT INTO notifications (user_id, viewed, type, title, message, click_action, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())",
				[user_id, false, type, title, message, click_action]
			);

			await sendNotification(user_id, title, message, type, {
				click_action,
			});
		}
	);
	await Promise.all(notificationsSendPromise);
};
