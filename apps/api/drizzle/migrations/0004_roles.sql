CREATE TABLE `role` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`is_system` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `role_name_unique` ON `role` (`name`);--> statement-breakpoint
CREATE TABLE `role_permission` (
	`role_id` text NOT NULL,
	`permission` text NOT NULL,
	PRIMARY KEY(`role_id`, `permission`),
	FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `role` (`id`, `name`, `description`, `is_system`, `created_at`, `updated_at`) VALUES
	('00000000-0000-4000-8000-00000000a001', 'admin', 'Full access, including permissions added later.', true, '2026-10-05T00:00:00.000Z', '2026-10-05T00:00:00.000Z'),
	('00000000-0000-4000-8000-00000000a002', 'user', 'Default role for every account.', true, '2026-10-05T00:00:00.000Z', '2026-10-05T00:00:00.000Z'),
	('00000000-0000-4000-8000-00000000a003', 'support', 'Can look up users and files but cannot change them.', false, '2026-10-05T00:00:00.000Z', '2026-10-05T00:00:00.000Z');
--> statement-breakpoint
INSERT INTO `role_permission` (`role_id`, `permission`) VALUES
	('00000000-0000-4000-8000-00000000a003', 'user:list'),
	('00000000-0000-4000-8000-00000000a003', 'user:get'),
	('00000000-0000-4000-8000-00000000a003', 'session:list'),
	('00000000-0000-4000-8000-00000000a003', 'file:list-any'),
	('00000000-0000-4000-8000-00000000a003', 'file:download-any');
