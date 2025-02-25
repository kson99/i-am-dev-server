--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: attachments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attachments (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    url text NOT NULL,
    type character varying(50),
    project_id integer
);


ALTER TABLE public.attachments OWNER TO postgres;

--
-- Name: attachments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attachments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attachments_id_seq OWNER TO postgres;

--
-- Name: attachments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attachments_id_seq OWNED BY public.attachments.id;


--
-- Name: chat_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_members (
    id bigint NOT NULL,
    chat_id integer,
    user_id integer
);


ALTER TABLE public.chat_members OWNER TO postgres;

--
-- Name: chat_members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chat_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chat_members_id_seq OWNER TO postgres;

--
-- Name: chat_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chat_members_id_seq OWNED BY public.chat_members.id;


--
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    id bigint NOT NULL,
    is_group boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    name character varying(255)
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- Name: chats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chats_id_seq OWNER TO postgres;

--
-- Name: chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chats_id_seq OWNED BY public.chats.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255),
    location character varying(255),
    address text,
    contact character varying(255),
    logo jsonb
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clients_id_seq OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    project_id integer,
    description text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: contact_us_pages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_us_pages (
    id integer NOT NULL,
    site character varying(255) NOT NULL,
    site_name character varying(255) NOT NULL,
    favicon jsonb,
    owner integer NOT NULL
);


ALTER TABLE public.contact_us_pages OWNER TO postgres;

--
-- Name: contact_us_pages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_us_pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_us_pages_id_seq OWNER TO postgres;

--
-- Name: contact_us_pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_us_pages_id_seq OWNED BY public.contact_us_pages.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    start timestamp with time zone,
    "end" timestamp with time zone,
    type character varying(50) NOT NULL,
    importance character varying(50) NOT NULL,
    owner integer NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id bigint NOT NULL,
    chat_id integer,
    sender_id integer,
    site_id integer,
    name character varying(255),
    email character varying(255),
    subject character varying(255),
    message text NOT NULL,
    type character varying(50),
    is_read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: notification_subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification_subscriptions (
    id integer NOT NULL,
    user_id integer,
    endpoint text NOT NULL,
    expiration_time timestamp with time zone,
    keys jsonb DEFAULT '{}'::jsonb,
    user_agent character varying(255),
    device_type character varying(50),
    preferences jsonb DEFAULT '{}'::jsonb,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notification_subscriptions OWNER TO postgres;

--
-- Name: notification_subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notification_subscriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notification_subscriptions_id_seq OWNER TO postgres;

--
-- Name: notification_subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notification_subscriptions_id_seq OWNED BY public.notification_subscriptions.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id integer NOT NULL,
    viewed boolean DEFAULT false,
    type character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    click_action text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    sender_id integer
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    status character varying(50),
    type character varying(50) NOT NULL,
    description text,
    image jsonb,
    tags text[],
    tech_stacks text[],
    dates jsonb,
    priority character varying(50),
    client_id integer,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    owner integer NOT NULL,
    hosted_at integer[]
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_id_seq OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id integer NOT NULL,
    product_name character varying(255) NOT NULL,
    description text,
    plan_name character varying(255) NOT NULL,
    plan_pricing character varying(255) NOT NULL,
    status character varying(50),
    initial_purchase_date timestamp with time zone,
    last_renewal_date timestamp with time zone,
    renewal_date timestamp with time zone,
    logo jsonb,
    owner integer NOT NULL
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- Name: subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subscriptions_id_seq OWNER TO postgres;

--
-- Name: subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscriptions_id_seq OWNED BY public.subscriptions.id;


--
-- Name: subtasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subtasks (
    id integer NOT NULL,
    task_id integer,
    title character varying(255) NOT NULL,
    completed boolean DEFAULT false
);


ALTER TABLE public.subtasks OWNER TO postgres;

--
-- Name: subtasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subtasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subtasks_id_seq OWNER TO postgres;

--
-- Name: subtasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subtasks_id_seq OWNED BY public.subtasks.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    project_id integer,
    title character varying(255) NOT NULL,
    description text,
    priority character varying(50),
    due_date timestamp with time zone NOT NULL,
    assigned_to character varying(255),
    optional boolean DEFAULT false,
    status character varying(50),
    owner integer NOT NULL
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id integer NOT NULL,
    role character varying(50) NOT NULL,
    role_identifier integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_roles_id_seq OWNER TO postgres;

--
-- Name: user_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_roles_id_seq OWNED BY public.user_roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    provider character varying(255),
    role character varying(255) NOT NULL,
    last_login timestamp with time zone,
    created_on timestamp with time zone,
    image jsonb,
    provider_user_id character varying(255) NOT NULL,
    status character varying(50) NOT NULL,
    notification_preferences jsonb,
    allow_notifications boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: attachments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachments ALTER COLUMN id SET DEFAULT nextval('public.attachments_id_seq'::regclass);


--
-- Name: chat_members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_members ALTER COLUMN id SET DEFAULT nextval('public.chat_members_id_seq'::regclass);


--
-- Name: chats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats ALTER COLUMN id SET DEFAULT nextval('public.chats_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: contact_us_pages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_us_pages ALTER COLUMN id SET DEFAULT nextval('public.contact_us_pages_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: notification_subscriptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_subscriptions ALTER COLUMN id SET DEFAULT nextval('public.notification_subscriptions_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: subscriptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions ALTER COLUMN id SET DEFAULT nextval('public.subscriptions_id_seq'::regclass);


--
-- Name: subtasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtasks ALTER COLUMN id SET DEFAULT nextval('public.subtasks_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: user_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN id SET DEFAULT nextval('public.user_roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: attachments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attachments (id, name, url, type, project_id) FROM stdin;
\.


--
-- Data for Name: chat_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_members (id, chat_id, user_id) FROM stdin;
\.


--
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chats (id, is_group, created_at, name) FROM stdin;
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id, name, email, location, address, contact, logo) FROM stdin;
1	Dickson Mushishi	developer@i-am-dev.com	Ruacana	PO Box 305, Etunda	+264 81 816 5143	\N
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, project_id, description, "timestamp", user_id) FROM stdin;
1	1	We need to complete this project so we can begin ussing it to track the progress of other projects.	2025-01-29 11:57:30.24542+02	2
\.


--
-- Data for Name: contact_us_pages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_us_pages (id, site, site_name, favicon, owner) FROM stdin;
2	https://i-am-dev.com	I Am Dev	{"id": "sidkjyteo3sjlmg1g4zz", "url": "https://res.cloudinary.com/kson/image/upload/v1740269615/sidkjyteo3sjlmg1g4zz.png", "name": "download.png"}	1
1	https://test.com	Test	\N	1
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, start, "end", type, importance, owner) FROM stdin;
4	Project Launch Party	\N	\N	unscheduled	minimal	1
1	Her Birthday	2025-03-19 00:00:00+02	2025-03-19 02:00:00+02	scheduled	high	1
5	This is a test event...	2025-02-06 00:00:00+02	2025-02-06 01:00:00+02	scheduled	low	1
2	My Birthday	2025-03-04 23:40:00+02	2025-03-04 23:59:00+02	scheduled	low	1
3	Project Admin Dashboard Launch	2025-02-19 13:05:00+02	2025-02-19 13:30:00+02	scheduled	critical	1
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, chat_id, sender_id, site_id, name, email, subject, message, type, is_read, created_at) FROM stdin;
1	\N	\N	1	Redge99	redge@gmail.com	Test 2	This is the second test for messages.	Web	t	2025-02-20 01:24:01.933106+02
2	\N	\N	1	Kson99	kson@gmail.com	Test 1	This is the first test for messages.	Web	t	2025-02-20 01:24:29.738658+02
5	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-20 18:49:27.020165+02
6	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 01:27:00.808021+02
7	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 01:28:20.944742+02
8	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:23.056187+02
9	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:26.928744+02
10	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:29.381687+02
11	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:29.951482+02
12	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:30.465237+02
13	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:30.969872+02
14	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:31.404282+02
15	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:31.886872+02
16	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:32.345613+02
17	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:32.828059+02
18	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:33.280135+02
19	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:33.7587+02
20	\N	\N	1	Armando Fernandez	armandof@gmail.com	Website Development	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	Web	t	2025-02-21 22:33:34.23297+02
\.


--
-- Data for Name: notification_subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification_subscriptions (id, user_id, endpoint, expiration_time, keys, user_agent, device_type, preferences, is_active, created_at, updated_at) FROM stdin;
6	1	https://fcm.googleapis.com/fcm/send/cn1I9TxgoBw:APA91bFuM6sWD4hzNrtkzLHzoK0Hs_9vc7iCCjPbWd3yFnCjo5lbY8aPickpXUR6U5fma_sr-pL3gZ5nfvMv_GrovVDlroxVKfRSPa782XFqTOa20tiZZMzsKluKbZD3r5HkVGAMnp8Q	\N	{"auth": "IG3gfk983vz_p_XvKfMmoQ", "p256dh": "BLcz8mq7tVz6JjzBbSo1a3iwEsJ23DZmVKBDRiIM9huqzHVEokN4AwyRax9YSkuiSYCX1SFD3VAd-J6OnEXzyck"}	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36	desktop	{"tasks": true, "events": true, "messages": true, "projects": true, "subscriptions": true, "access_request": true}	t	2025-02-11 03:53:02.172518+02	2025-02-11 16:13:03.555189+02
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, user_id, viewed, type, title, message, click_action, created_at, sender_id) FROM stdin;
1	1	t	projects	Project due today	Time is running out, Your 'I Am Dev Admin' project is due today.	/projects/1	2025-02-12 02:17:00.09548+02	\N
2	1	t	tasks	Tasks due today	Time is running out, You have 2 tasks due today.	/tasks	2025-02-12 02:17:00.096004+02	\N
3	1	t	projects	Project due today	Time is running out, Your 'I Am Dev Admin' project is due today.	/projects/1	2025-02-12 02:26:00.655326+02	\N
4	1	t	tasks	Tasks due today	Time is running out, You have 2 tasks due today.	/tasks	2025-02-12 02:26:00.723052+02	\N
18	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:29.952841+02	\N
8	1	t	events	Event in 15 minutes	Your event 'Project Admin Dashboard Launch' starts at 01:05 PM. Be ready! ⏳	/calendar	2025-02-19 12:50:00.151893+02	\N
9	1	t	events	Event starts now	Your event 'Project Admin Dashboard Launch' starts now 01:05 PM. 🚀	/calendar	2025-02-19 13:05:00.226604+02	\N
5	1	t	events	Event in 15 minutes	Your event 'My Birthday' starts at 11:40 PM. Be ready! ⏳	/calendar	2025-02-17 23:25:00.91615+02	\N
6	1	t	events	Event starts now	Your event 'My Birthday' starts now 11:40 PM. 🚀	/calendar	2025-02-17 23:40:00.409231+02	\N
7	1	t	access_request	User Requesting Access!	'Dickson Mushishi' is requesting access to the system.	users/access_requests	2025-02-18 00:48:41.003203+02	18
27	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:34.234027+02	\N
12	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-20 18:49:27.0225+02	\N
26	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:33.759715+02	\N
14	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 01:28:20.949499+02	\N
13	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 01:27:00.845907+02	\N
25	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:33.281262+02	\N
24	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:32.829445+02	\N
23	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:32.346638+02	\N
22	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:31.887995+02	\N
21	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:31.405556+02	\N
20	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:30.971053+02	\N
19	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:30.466509+02	\N
17	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:29.382798+02	\N
16	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:26.929798+02	\N
15	1	t	messages	Message from Test	Good day Sir, Im from A company called MediaTeck and would like to request a Project management website development Quotation.	/messages/1?tab=Web	2025-02-21 22:33:23.058564+02	\N
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, name, status, type, description, image, tags, tech_stacks, dates, priority, client_id, created, owner, hosted_at) FROM stdin;
4	NamLink	\N	Personal	This will be a mobile application. Main use will be advertisement and broadcasting.\n\nfeatures: \n- Broadcasting (lucrative)\n- Market\n- Freelancers\n- Vacancies	\N	{"Mobile App","API Development","Productivity Tools"}	{"React Native",JavaScript,GraphQL,PostgreSQL}	{"due": "2025-02-28T21:59:59.999Z"}	High	\N	2025-02-01 16:57:17.889+02	1	\N
1	I Am Dev Admin	\N	Personal	This is a project management system to help keep track of my projects and project requirements as task:\n\n- This will help with subscriptions Tracking\n- Project Due Date\n- Calendar Schedules\n- Website Messages\n- Clients and their projects	{"id": "izkgxkvvtrlejqbmktol", "url": "https://res.cloudinary.com/kson/image/upload/v1737491460/izkgxkvvtrlejqbmktol.png", "name": "download.png"}	{Web,"Content Management System","Mobile App",Healthcare,Networking}	{PostgreSQL,Firebase,Cloudinary,GraphQL,JavaScript,"Tailwind CSS",Next.js,Express.js,Node.js}	{"due": "2025-02-12T21:59:59.999Z"}	High	\N	2025-01-21 20:28:00.122+02	1	{1}
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (id, product_name, description, plan_name, plan_pricing, status, initial_purchase_date, last_renewal_date, renewal_date, logo, owner) FROM stdin;
2	Namescheap	Web And Mail hosting services	Stellar Plus	US$ 53.88	\N	2024-08-17 18:58:13+02	\N	2026-08-16 18:58:13+02	{"id": "l8kgx4szcfzxhvejko4v", "url": "https://res.cloudinary.com/kson/image/upload/v1738240497/l8kgx4szcfzxhvejko4v.png", "name": "download (1).png"}	1
1	Hostinger	Web and Mail hosting servicessss	Premium Web Hosting	US$ 335.52	\N	2023-11-14 18:46:25+02	\N	2026-11-14 18:46:25+02	{"id": "ceti0ymp0a3vqnknw3j5", "url": "https://res.cloudinary.com/kson/image/upload/v1738240793/ceti0ymp0a3vqnknw3j5.png", "name": "download.png"}	1
9	Namescheap	Domain for hosting my backend applications.	Domain - "serve-data.online"	US$ 1.16	\N	2024-11-13 15:26:19+02	\N	2025-11-13 15:26:19+02	\N	1
\.


--
-- Data for Name: subtasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subtasks (id, task_id, title, completed) FROM stdin;
13	2	Tasks update	t
15	2	Clients fetching	t
14	2	Clients update	t
16	2	Subscriptions upload	t
30	2	Events upload and update	t
36	7	SignIn & SignUp With Google	t
37	7	SignIn & SignUp With Github	t
38	7	Session authorization with graphql	t
39	7	Create Mutations	t
40	7	Update Mutations	t
41	7	Queries	t
31	2	Comments upload	t
32	2	Draggable events upload	t
33	2	Improve the loading component design	t
70	6	develop messages page	t
72	6	intergrate front-end with backend	t
73	6	unread counter next to tab	t
71	6	develop back-end functionalities	t
74	6	search functionality	t
76	6	Chat messages search	t
75	14	Contact us page management	t
54	5	Notification setting	t
68	5	Account Settings	t
55	5	Tags And Tech stacks	t
59	5	Theme Managent	t
60	5	Default View	t
42	10	Backend	t
43	10	Navbar	t
44	10	Tasks	t
46	10	Clients	t
45	10	Projects	t
48	10	Users	t
50	13	Countdown to expiration	t
51	13	Update Logo	t
49	13	Projects Hosted	t
22	4	Tasks upload and update	t
23	4	Projects upload and update	t
1	1	Project upload	t
2	1	Project update	t
4	1	Client upload	t
3	1	Client update	t
24	4	Attachments upload	t
27	4	Draggable events upload	t
25	4	comments uploads	t
26	4	Clients upload and update	t
28	4	Subscriptions upload and update	t
29	4	Events upload and update	t
47	10	Subscriptions	t
77	9	optional	t
17	3	Projects	t
19	3	Clients	t
18	3	Tasks	t
20	3	Calendar draggable events	t
21	3	Subscriptions	t
52	8	Tech Statcks	t
56	11	Manage Roles	t
57	11	Accepted / Allowed users 	t
58	11	Users Display	t
66	11	Finish creating the access request page	t
53	8	Tags	t
61	12	Events notifications	t
62	12	Project Due Dates	t
63	12	Messages	t
64	12	Access Requests from users	t
65	12	Subscription expirations	t
34	6	Display messages by send	t
5	2	Projects fetching	t
6	2	Subscriptions update	t
7	2	Subscriptions fetching	t
67	12	Notifications page invincible paging!	t
69	12	Open page on notification click	t
8	2	Projects update	t
9	2	Projects upload	t
10	2	Clients upload	t
11	2	Tasks fetching	t
12	2	Tasks upload	t
35	6	Have filters based on websites	t
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, project_id, title, description, priority, due_date, assigned_to, optional, status, owner) FROM stdin;
1	1	Images Upload sizes restrictions	Limiting image upload sizes to prevent backend timeout error and lengthy upload waits.	Normal	2025-01-31 00:00:00+02	\N	f	In Progress	1
3	1	No data indicators	Display a component when there is no data found or returned from the database instead of it just being blank.	Medium	2025-01-31 00:00:00+02	\N	f	In Progress	1
4	1	Error And Success Toasts	Display toasts for error and successes on occurance...	High	2025-01-31 00:00:00+02	\N	f	In Progress	1
9	1	Multiple Toasts	Make it possible to display multiple toasts at once for instances like notifications and multiple action notofications.	Normal	2025-01-31 00:00:00+02	\N	f	In Progress	1
7	1	Authentication and Authorization	Set up authentication for user and authorization for database interactions	High	2025-01-31 00:00:00+02	\N	f	In Progress	1
10	1	Search functionalies 	Implement all pages search functionality plus navbar.	Normal	2025-01-31 00:00:00+02	\N	f	In Progress	1
8	1	More items for Projects Page	Add options for tech stacks and Tags for project...	Medium	2025-01-31 00:00:00+02	\N	f	In Progress	1
6	1	Messages Page	This page will show messages from our Already hoste websites such as contact me data	High	2025-01-31 00:00:00+02	\N	f	In Progress	1
5	1	Settings Page	Create and add components to the setting page for setting managements...	High	2025-01-31 00:00:00+02	\N	f	In Progress	1
2	1	Data loading Loaders	Creater a loading element and set it to instances of data fetching loads and data upload loads..	Normal	2025-01-31 00:00:00+02	\N	f	In Progress	1
14	1	Profile Page	Finish develping user profile page....\n	Medium	2025-02-12 23:59:59.999+02	\N	f	In Progress	1
13	1	Subscription page	Create a Subscription page to display infomation about specified subscription like:\n\n- Projects Hosted\n- Countdown to expiration	High	2025-02-12 23:59:59.999+02	\N	f	In Progress	1
12	1	Notifications	Notification functionality for different types of operations within the app...	Medium	2025-02-12 23:59:59.999+02	\N	f	In Progress	1
11	1	Users's Page	Page for user managements	Normal	2025-02-12 23:59:59.999+02	\N	f	In Progress	1
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (id, role, role_identifier) FROM stdin;
1	standard	2
2	admin	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, provider, role, last_login, created_on, image, provider_user_id, status, notification_preferences, allow_notifications) FROM stdin;
2	redge kson	redgekson@gmail.com	google	standard	2025-02-19 12:30:48.274099+02	2025-01-11 11:49:14.97664+02	{"id": "frxjs2yr5yaoj3juheze", "url": "https://res.cloudinary.com/kson/image/upload/v1738439831/frxjs2yr5yaoj3juheze.jpg", "name": "Dickson Mushishi.jpeg"}	107514006219040178012	Active	\N	f
18	Dickson Mushishi	mushishidickson@gmail.com	google	standard	2025-02-18 01:13:13.099704+02	2025-02-05 16:12:59.718201+02	{"id": null, "url": "https://lh3.googleusercontent.com/a/ACg8ocJX3aDio3yUgmFLhDHevywfmTHD3ccjH5B3QRlt4kzDzWsL6GC3=s96-c", "name": null}	113413771106772010911	Requesting Access	\N	f
1	Mushishi Dickson	\N	github	admin	2025-02-24 01:29:32.962291+02	2025-01-11 11:49:14.97664+02	{"id": null, "url": "https://avatars.githubusercontent.com/u/64264319?v=4", "name": null}	64264319	Active	{"tasks": true, "events": true, "messages": true, "projects": true, "subscriptions": true, "access_request": true}	t
\.


--
-- Name: attachments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attachments_id_seq', 1, false);


--
-- Name: chat_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_members_id_seq', 1, false);


--
-- Name: chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chats_id_seq', 1, false);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_seq', 1, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, true);


--
-- Name: contact_us_pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_us_pages_id_seq', 2, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 5, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 20, true);


--
-- Name: notification_subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_subscriptions_id_seq', 90, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 27, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 4, true);


--
-- Name: subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscriptions_id_seq', 9, true);


--
-- Name: subtasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subtasks_id_seq', 77, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 14, true);


--
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_roles_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 164, true);


--
-- Name: attachments attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachments
    ADD CONSTRAINT attachments_pkey PRIMARY KEY (id);


--
-- Name: chat_members chat_members_chat_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_members
    ADD CONSTRAINT chat_members_chat_id_user_id_key UNIQUE (chat_id, user_id);


--
-- Name: chat_members chat_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_members
    ADD CONSTRAINT chat_members_pkey PRIMARY KEY (id);


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: contact_us_pages contact_us_pages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_us_pages
    ADD CONSTRAINT contact_us_pages_pkey PRIMARY KEY (id);


--
-- Name: contact_us_pages contact_us_pages_site_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_us_pages
    ADD CONSTRAINT contact_us_pages_site_key UNIQUE (site);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: notification_subscriptions notification_subscriptions_endpoint_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_subscriptions
    ADD CONSTRAINT notification_subscriptions_endpoint_key UNIQUE (endpoint);


--
-- Name: notification_subscriptions notification_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_subscriptions
    ADD CONSTRAINT notification_subscriptions_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: subtasks subtasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtasks
    ADD CONSTRAINT subtasks_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_role_identifier_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_identifier_key UNIQUE (role_identifier);


--
-- Name: user_roles user_roles_role_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_key UNIQUE (role);


--
-- Name: users users_email_provider_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_provider_user_id_key UNIQUE NULLS NOT DISTINCT (email, provider_user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: attachments attachments_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachments
    ADD CONSTRAINT attachments_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: chat_members chat_members_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_members
    ADD CONSTRAINT chat_members_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON DELETE CASCADE;


--
-- Name: chat_members chat_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_members
    ADD CONSTRAINT chat_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: comments comments_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: messages messages_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON DELETE CASCADE;


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: messages messages_site_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_site_id_fkey FOREIGN KEY (site_id) REFERENCES public.contact_us_pages(id);


--
-- Name: notification_subscriptions notification_subscriptions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_subscriptions
    ADD CONSTRAINT notification_subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: notifications notifications_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) NOT VALID;


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: projects projects_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id);


--
-- Name: projects projects_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_owner_fkey FOREIGN KEY (owner) REFERENCES public.users(id) NOT VALID;


--
-- Name: subtasks subtasks_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtasks
    ADD CONSTRAINT subtasks_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id);


--
-- Name: tasks tasks_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: users users_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_fkey FOREIGN KEY (role) REFERENCES public.user_roles(role) NOT VALID;


--
-- PostgreSQL database dump complete
--

