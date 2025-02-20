const { gql } = require("graphql-tag");

const typeDefs = gql`
  #graphql

  type Stats {
    projects_count: Int
    projects_completed: Int
    projects_hired: Int
    projects_personal: Int
    projects_collaborating: Int
    tasks_count: Int
    tasks_completed: Int
  }

  type Project {
    id: ID!
    name: String!
    status: String!
    type: String!
    description: String
    image: ItemImage
    tasks: [Task]
    tasks_count: Int
    tasks_completed: Int
    tags: [String!]
    tech_stacks: [String!]
    dates: ProjectDates
    comments: [ProjectComment]
    comments_count: Int
    created: String!
    priority: String
    collaborations: [ProjectCollaboration]
    attachments: [ProjectAttachment]
    attachments_count: Int
    client_id: ID
    client: Client
    hosted_at: [ID]
  }

  type ProjectDates {
    start: String!
    due: String!
  }

  type ProjectComment {
    id: ID!
    project_id: ID!
    description: String!
    timestamp: String!
    user_id: ID!
    user: User
  }

  type ProjectCollaboration {
    name: String!
    image: String!
    occupation: String!
    description: String!
  }

  type ProjectAttachment {
    id: ID!
    name: String!
    url: String!
    type: String!
    project_id: ID!
  }

  type Task {
    id: ID!
    project_id: ID!
    project: Project!
    title: String!
    description: String
    status: String!
    priority: String
    due_date: String!
    assignedTo: String
    optional: Boolean!
    subtasks: [Subtask]
    subtasks_count: Int
    subtasks_completed: Int
  }

  type Subtask {
    id: ID!
    title: String!
    completed: Boolean!
    task_id: ID!
    # dueDate: String!
    # optional: Boolean!
  }

  type Client {
    id: ID!
    name: String!
    email: String
    location: String
    address: String
    contact: String
    logo: ItemImage
    projects: [Project]
    projects_count: Int
  }

  type Event {
    id: ID!
    title: String!
    start: String
    end: String
    type: String!
    importance: String!
  }

  type Subscription {
    id: ID!
    product_name: String!
    description: String
    plan_name: String!
    plan_pricing: String!
    status: String
    logo: ItemImage
    initial_purchase_date: String
    last_renewal_date: String
    renewal_date: String
    clients: [Client]
    projects: [Project]
    projects_count: Int
  }

  type User {
    id: String!
    name: String!
    email: String
    provider: String!
    provider_user_id: String!
    role: String
    status: String
    image: ItemImage
    notification_preferences: JSON
    allow_notifications: Boolean
    last_login: String
    created_on: String
  }

  type ItemImage {
    name: String
    url: String
    id: String
  }

  type SearchResults {
    table: String!
    data: JSON
    count: Int
  }

  type Notification {
    id: ID!
    user_id: ID!
    viewed: Boolean
    type: String
    title: String
    message: String
    click_action: String
    created_at: String
    sender_id: ID
  }

  type NotificationSub {
    id: ID!
    user_id: ID!
    endpoint: String!
    expiration_time: String!
    keys: JSON
    user_agent: String
    device_type: String
    preferences: JSON
    is_active: Boolean
    created_at: String
    updated_at: String
  }

  type Message {
    id: ID!
    chat_id: ID
    sender_id: ID
    site_id: ID
    name: String
    email: String
    subject: String
    message: String
    type: String
    is_read: Boolean
    created_at: String
  }

  type Chat {
    id: ID!
    name: String
    last_message: JSON
    unread_count: Int
    reference: String
    messages: [Message]
    avatar: String
  }

  scalar JSON

  # Queries
  type Query {
    # Stats
    stats: Stats

    # Projects
    allProjects: [Project]
    projects(limit: Int!, offset: Int!): [Project]
    projects_count: Int
    pinnedProjects(pinned: [ID!]): [Project]
    project(id: ID!): Project
    projectsByPriority(priority: String!): [Project]

    # Tasks
    tasks(limit: Int!, offset: Int!): [Task]
    tasks_count: Int
    projectTasks(project_id: ID!): [Task]

    # Subtasks
    subtasks(id: ID!): [Subtask]

    # Clients
    allClients: [Client]
    clients(limit: Int!, offset: Int!): [Client]
    clients_count: Int
    client(id: ID!): Client

    # Events
    events: [Event]
    unscheduledEvents: [Event]

    # Subscriptions
    subscriptions(filter: String, limit: Int!, offset: Int!): [Subscription]
    subscriptions_count: Int
    subscription(id: ID!): Subscription

    # Search
    searchResults(
      table: String!
      query: String!
      offset: Int!
      limit: Int!
    ): SearchResults

    # user
    user: User
    users(limit: Int!, offset: Int!): [User]
    users_count: Int
    users_requsting_access(limit: Int!, offset: Int!): [User]
    users_requsting_access_count: Int

    # Notifications
    notifications(type: String!, limit: Int!, offset: Int!): [Notification]
    notifications_count(type: String!): Int

    # Messages
    chats(type: String!): [Chat]
    chat(id: ID!, type: String!): Chat
  }

  # Mutations
  type Mutation {
    # Project
    createProject(project: CreateProjectInput!): Project
    updateProject(id: ID!, updates: UpdateProjectInput!): Project
    updateProjectHost(id: ID!, projects: [ID!]!): [Project]

    # Tasks
    createTask(task: CreateTaskInput!): Task
    updateTask(id: ID!, updates: UpdateTaskInput!): Task
    updateSubtasks(subtasks: [SubtasksInput!]!): [Subtask]

    # Comments
    createComment(comment: ProjectCommentInput!): ProjectComment

    # Attachments
    createAttachment(attachment: ProjectAttachmentInput!): ProjectAttachment

    # Clients
    createClient(client: CreateClientInput!): Client
    updateClient(id: ID!, updates: UpdateClientInput!): Client

    # Events
    createEvent(event: CreateEventInput!): Event
    updateEvent(id: ID!, updates: UpdateEventInput!): Event

    # Subscriptions
    createSubscription(subscription: CreateSubscriptionInput!): Subscription
    updateSubscription(id: ID!, updates: UpdateSubscriptionInput!): Subscription
    updateSubscriptionLogo(
      id: ID!
      updates: UpdateSubscriptionLogoInput!
    ): Subscription

    # Users
    updateUserImage(updates: UpdateUserImageInput!): User
    updateUserPreferences(updates: UpdateUserPreferencesInput!): User
    updateUserStatus(id: ID!, status: String!): User

    # Notification
    updateNotificationViewed(id: ID!): Notification

    # Messages
    markMessagesAsRead(chat_id: ID!, type: String!): [Chat]
  }

  input CreateProjectInput {
    name: String!
    status: String
    type: String!
    tags: [String!]
    tech_stacks: [String!]
    description: String!
    priority: String!
    dates: ProjectDatesInput
    image: File
    client_id: ID
    owner: ID!
  }

  input UpdateProjectInput {
    name: String
    status: String
    type: String
    description: String
    tags: [String!]
    tech_stacks: [String!]
    dates: ProjectDatesInput
    priority: String
    image_removed: ItemImageInput
    new_image: File
    client_id: ID
  }

  input ProjectDatesInput {
    start: String
    due: String!
  }

  input ProjectCommentInput {
    project_id: ID!
    description: String!
    timestamp: String
    user_id: ID!
  }

  input CreateTaskInput {
    title: String!
    priority: String!
    due_date: String!
    description: String!
    project_id: ID!
    owner: ID!
  }

  input UpdateTaskInput {
    title: String
    priority: String
    due_date: String
    description: String
  }

  input SubtasksInput {
    id: ID
    title: String!
    completed: Boolean!
    task_id: ID!
  }

  input ProjectCollaborationInput {
    name: String!
    image: String
    occupation: String
    description: String
  }

  input ProjectAttachmentInput {
    project_id: ID!
    filename: String!
    url: String!
  }

  input File {
    filename: String!
    url: String!
    type: String
  }

  input CreateClientInput {
    name: String!
    email: String
    location: String
    address: String
    contact: String
    logo: File
  }

  input UpdateClientInput {
    name: String
    email: String
    location: String
    address: String
    contact: String
    logo_removed: ItemImageInput
    new_logo: File
  }

  input CreateEventInput {
    title: String!
    start: String
    end: String
    type: String!
    importance: String!
    owner: ID!
  }

  input UpdateEventInput {
    title: String
    start: String
    end: String
    type: String
    importance: String
  }

  input CreateSubscriptionInput {
    product_name: String!
    description: String!
    plan_name: String!
    plan_pricing: String!
    initial_purchase_date: String!
    renewal_date: String!
    owner: ID!
  }

  input UpdateSubscriptionInput {
    product_name: String
    description: String
    plan_name: String
    plan_pricing: String
    initial_purchase_date: String
    renewal_date: String
    logo: File
  }

  input UpdateSubscriptionLogoInput {
    logo_removed: ItemImageInput
    new_logo: File
  }

  input UpdateUserImageInput {
    new_image: File
    image_removed: ItemImageInput
  }

  input UpdateUserPreferencesInput {
    notification_preferences: JSON
    allow_notifications: Boolean
  }

  input UpdateNotificationSubInput {
    is_active: Boolean
    preferences: NotificationPreferencesInput
  }

  input NotificationPreferencesInput {
    projects: Boolean
    tasks: Boolean
    messages: Boolean
    events: Boolean
    subscriptions: Boolean
    access_request: Boolean
  }

  input ItemImageInput {
    id: String!
    name: String!
    url: String!
  }
`;

module.exports = { typeDefs };
