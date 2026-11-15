CREATE TABLE `super_admin_mutation_lock` (
	`name` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`expires_at` integer NOT NULL
);
