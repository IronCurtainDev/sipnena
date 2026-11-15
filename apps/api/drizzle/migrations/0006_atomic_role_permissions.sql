INSERT OR IGNORE INTO `role_permission` (`role_id`, `permission`)
SELECT `role_id`, 'role:create' FROM `role_permission`
WHERE `permission` = 'role:manage';
--> statement-breakpoint
INSERT OR IGNORE INTO `role_permission` (`role_id`, `permission`)
SELECT `role_id`, 'role:update' FROM `role_permission`
WHERE `permission` = 'role:manage';
--> statement-breakpoint
INSERT OR IGNORE INTO `role_permission` (`role_id`, `permission`)
SELECT `role_id`, 'role:delete' FROM `role_permission`
WHERE `permission` = 'role:manage';
--> statement-breakpoint
INSERT OR IGNORE INTO `role_permission` (`role_id`, `permission`)
SELECT `role_id`, 'user:unban' FROM `role_permission`
WHERE `permission` = 'user:ban';
-- Keep role:manage for one compatibility release. The new permission catalog
-- ignores it, while a previous Worker can still authorize during deployment
-- or rollback. Remove it in a later append-only migration.
