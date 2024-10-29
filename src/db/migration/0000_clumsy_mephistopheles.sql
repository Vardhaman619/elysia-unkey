CREATE TABLE `person` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`email` text,
	`gender` text,
	`age` integer,
	`phone` text,
	`address` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`name` text,
	`email` text,
	`apiId` text NOT NULL,
	`apiKey` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_apiId_unique` ON `users` (`apiId`);