-- Better Auth looks up Google identities by provider and provider account ID.
-- Keep this application-owned index outside its generated authentication schema.
CREATE INDEX `account_provider_account_idx` ON `account` (`provider_id`, `account_id`);
