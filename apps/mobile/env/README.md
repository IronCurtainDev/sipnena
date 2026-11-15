# Environment Configuration Files

This directory contains environment-specific configuration files for the application.

## Files

- **`.env.development`** - Development environment variables
- **`.env.staging`** - Staging environment variables
- **`.env.production`** - Production environment variables
- **`.env.example`** - Template file (safe to commit)

## Setup

1. From the project root, create missing flavor files without overwriting existing values:
   ```bash
   for flavor in development staging production; do
     if [ ! -e "env/.env.$flavor" ]; then
       cp env/.env.example "env/.env.$flavor"
     fi
   done
   ```

   The app asset manifest bundles `env/.env.development` for local development and test runs. Example values suffice for the offline unit/widget test suite; no live credentials or external backends are required.

2. Before running the app, update each file with your target runtime values:
   ```properties
   BASE_URL=https://api.yourdomain.com/api/v1
   API_KEY=your_actual_api_key
   SESSION_KEY=auth_session_box
   ```

## Optional Integrations

If your project enables optional services (such as Pusher in `core_injection.dart` or Stripe in `bootstrap.dart`), provide the corresponding environment variables:

| Setting | Description | Example / Default |
|---|---|---|
| `PUSHER_APP_KEY` | Public app key for Pusher channels | `your_pusher_app_key` |
| `PUSHER_CLUSTER` | Pusher cluster identifier | `mt1` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_sample_key` |

## Security

> NEVER commit actual credentials or production `.env` files to git.

- Only `.env.example` is committed to version control.
- All real `.env*` files are ignored by `.gitignore`.
- Keep production credentials secure in your CI/CD secret manager.

## Running Flavors

The app loads the corresponding `.env` file based on the build entry point:

```bash
# Development (Sandbox)
flutter run --flavor sandbox -t lib/main_development.dart

# Staging (Sandbox)
flutter run --flavor sandbox -t lib/main_staging.dart

# Production (Live)
flutter run --flavor live -t lib/main_production.dart
```
