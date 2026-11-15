import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { DEFAULT_ROLE, SUPER_ADMIN_ROLE } from "@repo/contracts";
import { hashPassword } from "better-auth/crypto";
import type { Auth, BetterAuthOptions } from "better-auth";
import { isAPIError } from "better-auth/api";
import { betterAuth } from "better-auth/minimal";
import { bearer, openAPI, organization } from "better-auth/plugins";
import { admin } from "better-auth/plugins/admin";
import { createDb } from "../db/client";
import * as schema from "../db/schema";
import { describeError, logEvent } from "../lib/log";
import { currentRequestId } from "../lib/request-context";
import { deleteAllFilesForUser } from "../modules/files/files.service";
import type { Bindings } from "../types/bindings";
import { ac, authRolesFor } from "./access-control";
import { authSettings } from "./config";
import { sendEmail } from "./email";

type AuthOptions = BetterAuthOptions & {
  plugins: [
    ReturnType<typeof bearer>,
    ReturnType<typeof openAPI>,
    ReturnType<typeof admin>,
    ...ReturnType<typeof organization>[],
  ];
};

export async function ensureDevelopmentAdmin(env: Bindings, force = false) {
  if (
    env.ENVIRONMENT !== "development" ||
    !env.ADMIN_EMAIL ||
    !env.ADMIN_PASSWORD
  )
    return;
  const email = env.ADMIN_EMAIL;
  const existing = await env.DB.prepare(
    "SELECT id FROM user WHERE lower(email) = lower(?) LIMIT 1",
  )
    .bind(email)
    .first<{ id: string }>();

  if (existing && !force) {
    const existingAccount = await env.DB.prepare(
      "SELECT id FROM account WHERE user_id = ? AND provider_id = 'credential' LIMIT 1",
    )
      .bind(existing.id)
      .first<{ id: string }>();
    if (existingAccount) return;
  }

  const now = Date.now();
  const userId = existing?.id ?? crypto.randomUUID();
  if (!existing) {
    await env.DB.prepare(
      "INSERT INTO user (id, name, email, email_verified, role, banned, created_at, updated_at) VALUES (?, ?, ?, true, 'admin', false, ?, ?)",
    )
      .bind(userId, "Admin", email, now, now)
      .run();
  }
  if (existing) {
    await env.DB.prepare(
      "UPDATE user SET role = 'admin', email_verified = true, banned = false, updated_at = ? WHERE id = ?",
    )
      .bind(now, userId)
      .run();
  }
  const password = await hashPassword(env.ADMIN_PASSWORD);
  const account = await env.DB.prepare(
    "SELECT id FROM account WHERE user_id = ? AND provider_id = 'credential' LIMIT 1",
  )
    .bind(userId)
    .first<{ id: string }>();
  if (account) {
    await env.DB.prepare(
      "UPDATE account SET account_id = ?, password = ?, updated_at = ? WHERE id = ?",
    )
      .bind(userId, password, now, account.id)
      .run();
    return;
  }
  await env.DB.prepare(
    "INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at) VALUES (?, ?, 'credential', ?, ?, ?, ?)",
  )
    .bind(crypto.randomUUID(), userId, userId, password, now, now)
    .run();
}

const instances = new WeakMap<Bindings, Auth<AuthOptions>>();

// Workers reuse the env object within an isolate, so configuration is
// validated and Better Auth is constructed once rather than per request.
export function getAuth(env: Bindings) {
  let auth = instances.get(env);
  if (!auth) {
    auth = createAuth(env);
    instances.set(env, auth);
  }
  return auth;
}

export function createAuth(env: Bindings): Auth<AuthOptions> {
  const settings = authSettings(env);
  return betterAuth<AuthOptions>({
    appName: "MVP Starter",
    baseURL: settings.baseURL,
    basePath: "/api/auth",
    secret: env.BETTER_AUTH_SECRET,
    logger: {
      level: "error",
      log: (level, _message, ...args: unknown[]) =>
        logEvent("error", "auth_error", {
          requestId: currentRequestId(),
          authLevel: level,
          ...(args[0] instanceof Error
            ? describeError(args[0], { includeMessage: false })
            : {}),
        }),
    },
    onAPIError: {
      onError: (error) => {
        if (isAPIError(error)) return;
        logEvent("error", "auth_request_failed", {
          requestId: currentRequestId(),
          ...describeError(error, { includeMessage: false }),
        });
      },
    },
    database: drizzleAdapter(createDb(env.DB), {
      provider: "sqlite",
      schema,
      transaction: false,
    }),
    trustedOrigins: settings.trustedOrigins,
    // Mobile clients store the bearer token for this long; documented in docs/api.md.
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      freshAge: 60 * 60 * 24,
    },
    user: {
      deleteUser: {
        enabled: true,
        // Runs before Better Auth removes sessions and accounts, so a storage
        // failure leaves the user able to sign in and retry.
        beforeDelete: (user) => deleteAllFilesForUser(env, user.id),
      },
    },
    databaseHooks: {
      user: {
        delete: {
          // Covers admin removal; files reference users with ON DELETE RESTRICT.
          before: async (user) => {
            await deleteAllFilesForUser(env, user.id);
          },
        },
      },
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user, url }) => {
        await sendEmail(env, {
          to: user.email,
          subject: "Reset your password",
          text: `Reset your password: ${url}\n\nIf you did not request this, ignore this email.`,
        });
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendOnSignIn: true,
      autoSignInAfterVerification: false,
      sendVerificationEmail: async ({ user, url }) => {
        await sendEmail(env, {
          to: user.email,
          subject: "Verify your email",
          text: `Verify your email address: ${url}`,
        });
      },
    },
    socialProviders: settings.googleEnabled
      ? {
          google: {
            clientId: [
              env.GOOGLE_CLIENT_ID!,
              ...(env.GOOGLE_MOBILE_CLIENT_IDS?.split(",")
                .map((id) => id.trim())
                .filter(Boolean) ?? []),
            ],
            clientSecret: env.GOOGLE_CLIENT_SECRET!,
          },
        }
      : {},
    // Workers' native limiter runs before password hashing and email delivery.
    rateLimit: { enabled: false },
    advanced: {
      database: { generateId: () => crypto.randomUUID() },
      ipAddress: { ipAddressHeaders: ["cf-connecting-ip"] },
    },
    plugins: [
      bearer({ requireSignature: true }),
      openAPI({ disableDefaultReference: true }),
      admin({
        ac,
        roles: authRolesFor(env),
        adminRoles: [SUPER_ADMIN_ROLE],
        defaultRole: DEFAULT_ROLE,
      }),
      ...(settings.organizationsEnabled
        ? [
            organization({
              allowUserToCreateOrganization: (user) => user.emailVerified,
              organizationLimit: 5,
              membershipLimit: 25,
              invitationLimit: 20,
              sendInvitationEmail: async ({ email, id, organization: org }) => {
                const url = new URL(
                  `/accept-invitation/${id}`,
                  settings.baseURL,
                );
                await sendEmail(env, {
                  to: email,
                  subject: `Invitation to ${org.name}`,
                  text: `You have been invited to ${org.name}. Accept the invitation: ${url.href}`,
                });
              },
            }),
          ]
        : []),
    ],
  });
}
