CREATE TABLE `idempotency_keys` (
	`key` text NOT NULL,
	`user_id` text NOT NULL,
	`route` text NOT NULL,
	`request_hash` text NOT NULL,
	`status` text NOT NULL,
	`status_code` integer,
	`response_headers` text,
	`response_body` text,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	PRIMARY KEY(`key`, `user_id`)
);
--> statement-breakpoint
CREATE INDEX `idempotency_keys_expires_at_idx` ON `idempotency_keys` (`expires_at`);