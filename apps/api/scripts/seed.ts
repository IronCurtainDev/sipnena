import { hashPassword } from "better-auth/crypto";
import { spawnSync } from "node:child_process";
import { rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const PASSWORD = "Password1234!";

const USERS = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    name: "Sarah Support",
    email: "support@example.com",
    role: "support",
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    name: "Alex Member",
    email: "member@example.com",
    role: "user",
  },
];

const ORG = {
  id: "00000000-0000-4000-8000-000000000010",
  name: "Acme Corporation",
  slug: "acme-corp",
  ownerId: USERS[0]!.id,
  memberId: USERS[2]!.id,
};

const REMOVE_EMAILS = [
  ...USERS.map((user) => user.email),
  // Earlier seeds inserted this account with file rows and no stored objects.
  "demo@example.com",
];

function sqlString(value: string) {
  return `'${value.replaceAll("'", "''")}'`;
}

async function generateSeedSql() {
  const now = Date.now();
  const emails = REMOVE_EMAILS.map((email) => sqlString(email)).join(", ");
  const statements = [
    `DELETE FROM files WHERE user_id IN (SELECT id FROM user WHERE email IN (${emails}));`,
    `DELETE FROM user WHERE email IN (${emails});`,
    `DELETE FROM organization WHERE slug = ${sqlString(ORG.slug)};`,
  ];

  for (const user of USERS) {
    const passwordHash = await hashPassword(PASSWORD);
    const accountId = user.id.replace("-8000-", "-8001-");
    statements.push(
      `INSERT INTO user (id, name, email, email_verified, role, banned, created_at, updated_at)
       VALUES (${sqlString(user.id)}, ${sqlString(user.name)}, ${sqlString(user.email)}, 1, ${sqlString(user.role)}, 0, ${now}, ${now});`,
      `INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
       VALUES (${sqlString(accountId)}, ${sqlString(user.id)}, 'credential', ${sqlString(user.id)}, ${sqlString(passwordHash)}, ${now}, ${now});`,
    );
  }

  statements.push(
    `INSERT INTO organization (id, name, slug, created_at)
     VALUES (${sqlString(ORG.id)}, ${sqlString(ORG.name)}, ${sqlString(ORG.slug)}, ${now});`,
    `INSERT INTO member (id, organization_id, user_id, role, created_at)
     VALUES (${sqlString("00000000-0000-4000-8000-000000000011")}, ${sqlString(ORG.id)}, ${sqlString(ORG.ownerId)}, 'owner', ${now});`,
    `INSERT INTO member (id, organization_id, user_id, role, created_at)
     VALUES (${sqlString("00000000-0000-4000-8000-000000000012")}, ${sqlString(ORG.id)}, ${sqlString(ORG.memberId)}, 'member', ${now});`,
  );

  return statements.join("\n");
}

async function main() {
  if (process.argv.includes("--remote")) {
    console.error("db:seed only runs against the local D1 database.");
    process.exit(1);
  }

  console.log("Seeding the local D1 database...");
  const apiDir = resolve(import.meta.dirname, "..");
  const tempPath = resolve(apiDir, `.seed.${Date.now()}.sql`);

  try {
    await writeFile(tempPath, await generateSeedSql(), "utf8");
    const proc = spawnSync(
      "pnpm",
      [
        "exec",
        "wrangler",
        "d1",
        "execute",
        "DB",
        "--local",
        `--file=${tempPath}`,
        "-y",
      ],
      { stdio: "inherit", cwd: apiDir },
    );
    if (proc.status !== 0) {
      throw new Error(`Seeder failed with exit code ${proc.status}`);
    }

    console.log("Local database seeded.");
    console.log("Accounts use password Password1234!:");
    console.log("  admin@example.com   (admin)");
    console.log("  support@example.com (support)");
    console.log("  member@example.com  (user)");
    console.log("Organization: Acme Corporation (acme-corp)");
  } finally {
    await rm(tempPath, { force: true }).catch(() => undefined);
  }
}

main().catch((error: unknown) => {
  console.error("Seeding error:", error);
  process.exit(1);
});
