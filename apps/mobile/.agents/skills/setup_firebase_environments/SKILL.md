---
name: setup_firebase_environments
description: Use this skill when configuring, checking, or troubleshooting Firebase across Sandbox and Live environments in the Flutter starter project.
---

# Firebase Multi-Environment Setup Skill

Use this skill whenever setting up, modifying, or troubleshooting Firebase configuration in the Flutter Starter app.

## Key Environment Mappings

| Environment | Dart Entry Point | Native Flavor | Android Package | Android Path | iOS Bundle ID | iOS Path | Dart Options |
|---|---|---|---|---|---|---|---|
| **Development** | `lib/main_development.dart` | `sandbox` | `com.em.starter.sandbox` | `android/app/src/sandbox/google-services.json` | `com.em.starter.sandbox` | `ios/config/sandbox/GoogleService-Info.plist` | `lib/firebase_options_sandbox.dart` |
| **Staging** | `lib/main_staging.dart` | `sandbox` | `com.em.starter.sandbox` | `android/app/src/sandbox/google-services.json` | `com.em.starter.sandbox` | `ios/config/sandbox/GoogleService-Info.plist` | `lib/firebase_options_sandbox.dart` |
| **Production** | `lib/main_production.dart` | `live` | `com.em.starter` | `android/app/src/live/google-services.json` | `com.em.starter` | `ios/config/live/GoogleService-Info.plist` | `lib/firebase_options_live.dart` |

## Strict Rules & Mechanics

1. **Ruby Environment Prerequisite (avoid `xcodeproj` LoadError)**:
   - Ensure Homebrew's Ruby is in PATH: `export PATH="/opt/homebrew/opt/ruby/bin:$PATH"`
   - Ensure `gem install xcodeproj` is installed in that Ruby.
2. **FlutterFire CLI Commands**:
   - **Sandbox:**
     ```bash
     flutterfire configure --project=your-project-sandbox --out=lib/firebase_options_sandbox.dart --platforms=android,ios --android-package-name=com.em.starter.sandbox --ios-bundle-id=com.em.starter.sandbox --yes
     mv android/app/google-services.json android/app/src/sandbox/google-services.json
     cp ios/Runner/GoogleService-Info.plist ios/config/sandbox/GoogleService-Info.plist
     ```
   - **Live:**
     ```bash
     flutterfire configure --project=your-project-live --out=lib/firebase_options_live.dart --platforms=android,ios --android-package-name=com.em.starter --ios-bundle-id=com.em.starter --yes
     mv android/app/google-services.json android/app/src/live/google-services.json
     cp ios/Runner/GoogleService-Info.plist ios/config/live/GoogleService-Info.plist
     ```
3. **Do NOT place `GoogleService-Info.plist` in `ios/Runner/` directly**:
   - iOS uses an Xcode build phase that runs `ios/scripts/copy_firebase_config.sh`.
   - It reads from `ios/config/sandbox/GoogleService-Info.plist` or `ios/config/live/GoogleService-Info.plist` based on `$PRODUCT_BUNDLE_IDENTIFIER`.
4. **Android SourceSets**:
   - `com.google.gms.google-services` automatically reads from `android/app/src/<flavor>/google-services.json`.
5. **Never Commit Real Firebase Secrets**:
   - Real configuration files are in `.gitignore`. Only `.example` template files are tracked.
6. **Always Specify Flavor on Launch**:
   - For dev/staging: `flutter run --flavor sandbox -t lib/main_development.dart`
   - For production: `flutter run --flavor live -t lib/main_production.dart`

## Verification Checklist

- [ ] `android/app/src/sandbox/google-services.json` exists and includes client for `com.em.starter.sandbox`
- [ ] `android/app/src/live/google-services.json` exists and includes client for `com.em.starter`
- [ ] `ios/config/sandbox/GoogleService-Info.plist` exists with `BUNDLE_ID` `com.em.starter.sandbox`
- [ ] `ios/config/live/GoogleService-Info.plist` exists with `BUNDLE_ID` `com.em.starter`
- [ ] `lib/bootstrap.dart` initializes Firebase using the respective options for the environment.
