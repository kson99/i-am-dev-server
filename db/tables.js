const db = require(".");

const createTables = async (req, res) => {
  try {
    const { rows } = await db.query(
      `
            -- Table for User
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE, 
                provider VARCHAR(255),
                provider_user_id VARCHAR(255),
                role VARCHAR(255),
                status VARCHAR(50),
                image JSONB,
                last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            -- Table for Client
            CREATE TABLE IF NOT EXISTS clients (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                location VARCHAR(255),
                address TEXT,
                contact VARCHAR(255),
                logo JSONB
            );

            -- Table for Subscription
            CREATE TABLE IF NOT EXISTS subscriptions (
                id SERIAL PRIMARY KEY,
                product_name VARCHAR(255) NOT NULL UNIQUE,
                description TEXT,
                plan_name VARCHAR(255) NOT NULL,
                plan_pricing VARCHAR(255) NOT NULL,
                status VARCHAR(50),
                initial_purchase_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                last_renewal_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                renewal_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                owner INT NOT NULL REFERENCES users(id)
            );

            -- Table for Project
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                status VARCHAR(50),
                type VARCHAR(50) NOT NULL,
                description TEXT,
                image JSONB,
                tags TEXT[],
                tech_stacks TEXT[],
                dates JSONB,
                priority VARCHAR(50),
                client_id INT REFERENCES clients(id),
                hosted_at INT[] REFERENCES subscriptions(id),
                created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                owner INT NOT NULL REFERENCES users(id)
            );
                
            -- Table for ProjectComments
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                project_id INT NOT NULL REFERENCES projects(id),
                description TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_id INT NOT NULL REFERENCES users(id)
            );
                
            -- Table for ProjectAttachment
            CREATE TABLE IF NOT EXISTS attachments (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                url TEXT NOT NULL,
                type VARCHAR(50),
                project_id INT NOT NULL REFERENCES projects(id)
            );
                
            -- Table for Task
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                project_id INT NOT NULL REFERENCES projects(id),
                title VARCHAR(255) NOT NULL,
                description TEXT,
                status VARCHAR(50) NOT NULL,
                priority VARCHAR(50),
                due_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
                assigned_to VARCHAR(255),
                optional BOOLEAN DEFAULT FALSE,
                owner INT NOT NULL REFERENCES users(id)
            );
                
            -- Table for Subtask
            CREATE TABLE IF NOT EXISTS subtasks (
                id SERIAL PRIMARY KEY,
                task_id INT NOT NULL REFERENCES tasks(id),
                title VARCHAR(255) NOT NULL,
                completed BOOLEAN DEFAULT FALSE
            );
    
            -- Table for Event
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                start TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "end" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                type VARCHAR(50) NOT NULL,
                importance VARCHAR(50) NOT NULL,
                owner INT NOT NULL REFERENCES users(id)
            );

            -- Table for Notification subscriptions
            CREATE TABLE IF NOT EXISTS notification_subscriptions (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(id),
                endpoint TEXT NOT NULL UNIQUE,
                expiration_time TIMESTAMP WITH TIME ZONE NULL,
                keys JSONB DEFAULT '{}'::JSONB,
                user_agent VARCHAR(255),
                device_type VARCHAR(50),
                preferences JSONB DEFAULT '{}'::JSONB,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );


            -- Table for Notifications
            CREATE TABLE IF NOT EXISTS notifications (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(id),
                sender_id INT REFERENCES users(id),
                viewed BOOLEAN DEFAULT FALSE,
                type VARCHAR(50) NOT NULL,
                title VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                click_action TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
            `
    );

    return res
      .status(200)
      .json({ message: "Tables created successfully", data: rows });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createTables };
