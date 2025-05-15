CREATE TABLE "emails" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "emails_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "emails_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "usernames" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "usernames_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"username" varchar(255) NOT NULL,
	CONSTRAINT "usernames_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"email_id" integer NOT NULL,
	"username_id" integer NOT NULL,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL
);
