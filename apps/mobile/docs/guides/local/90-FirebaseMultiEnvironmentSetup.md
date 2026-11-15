# Firebase Setup Guide (Sandbox & Live)

This guide covers how Firebase is set up across our two environments (**Sandbox** and **Live**) for Android and iOS, and what to do when you need to connect or update Firebase configurations.

---

## Environment Cheat Sheet

| Environment | Dart Entrypoint | Flavor | Firebase Project | Android Package | iOS Bundle ID | Config Files Location |
|---|---|---|---|---|---|---|
| **Development** | `lib/main_development.dart` | `sandbox` | `your-project-sandbox` | `com.em.starter.sandbox` | `com.em.starter.sandbox` | `android/app/src/sandbox/`<br>`ios/config/sandbox/` |
| **Staging** | `lib/main_staging.dart` | `sandbox` | `your-project-sandbox` | `com.em.starter.sandbox` | `com.em.starter.sandbox` | `android/app/src/sandbox/`<br>`ios/config/sandbox/` |
| **Production** | `lib/main_production.dart` | `live` | `your-project-live` | `com.em.starter` | `com.em.starter` | `android/app/src/live/`<br>`ios/config/live/` |

**Security Note:** The real `google-services.json` and `GoogleService-Info.plist` files are ignored by Git (`.gitignore`). Never force-commit real credentials to the repository.

---

## File Locations in the Project

Keep files in these exact folders so the build flavors pick them up automatically:

```text
starter-clean-bloc/
├── android/app/src/
│   ├── sandbox/
│   │   └── google-services.json          <-- Dev & Staging credentials
│   └── live/
│       └── google-services.json          <-- Production credentials
│
├── ios/config/
│   ├── sandbox/
│   │   └── GoogleService-Info.plist      <-- Dev & Staging credentials
│   └── live/
│       └── GoogleService-Info.plist      <-- Production credentials
│
└── lib/
    ├── firebase_options_sandbox.dart     <-- Dart options for Sandbox
    └── firebase_options_live.dart        <-- Dart options for Live
```

**Do not leave `GoogleService-Info.plist` in `ios/Runner/`**. An Xcode build script automatically copies the right plist from `ios/config/<flavor>/` into the app bundle when you build.

---

## Before You Start: Mac Ruby Prerequisite

If you use `flutterfire configure`, it runs Ruby under the hood to inspect your Xcode project. macOS's default system Ruby is missing the `xcodeproj` gem, which causes the CLI to crash at the very end with `cannot load such file -- xcodeproj`.

To prevent this, make sure your terminal uses Homebrew's Ruby:

```bash
# Add Homebrew Ruby to PATH (if not already done)
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Install the required gem
gem install xcodeproj

# Quick check — should print "Ready"
ruby -e "require 'xcodeproj'; puts 'Ready'"
```

---

## Connecting Firebase with FlutterFire CLI

Make sure you're logged in first (`firebase login`), then run the steps for whichever environment you are configuring.

### 1. Sandbox Environment (Dev / Staging)

Run the CLI command:
```bash
flutterfire configure \
  --project=your-project-sandbox \
  --out=lib/firebase_options_sandbox.dart \
  --platforms=android,ios \
  --android-package-name=com.em.starter.sandbox \
  --ios-bundle-id=com.em.starter.sandbox \
  --yes
```

Move the generated files into the sandbox folders:
```bash
mv android/app/google-services.json android/app/src/sandbox/google-services.json
cp ios/Runner/GoogleService-Info.plist ios/config/sandbox/GoogleService-Info.plist
```

---

### 2. Live Environment (Production)

Run the CLI command:
```bash
flutterfire configure \
  --project=your-project-live \
  --out=lib/firebase_options_live.dart \
  --platforms=android,ios \
  --android-package-name=com.em.starter \
  --ios-bundle-id=com.em.starter \
  --yes
```

Move the generated files into the live folders:
```bash
mv android/app/google-services.json android/app/src/live/google-services.json
cp ios/Runner/GoogleService-Info.plist ios/config/live/GoogleService-Info.plist
```

---

## Why do we have to move the files?

FlutterFire is built for simple apps that only have one environment, so it drops files into the project root (`android/app/` and `ios/Runner/`).

Because this is a multi-flavor app:
- **Android Gradle** looks into `android/app/src/<flavor>/google-services.json` based on the `--flavor` flag.
- **Xcode** uses a build phase script (`ios/scripts/copy_firebase_config.sh`) that reads the bundle ID and copies the matching plist from `ios/config/<flavor>/` into the app.

Moving the files ensures that testing in Sandbox never accidentally touches your production Firebase project, databases, or users.

---

## Alternative: Downloading Directly from Firebase Console

If you don't want to use FlutterFire CLI, you can download the files from the web console:

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Select your project (`your-project-sandbox` or `your-project-live`).
3. Under **Project settings ➔ General ➔ Your apps**:
   - Download `google-services.json` and save to `android/app/src/<flavor>/google-services.json`
   - Download `GoogleService-Info.plist` and save to `ios/config/<flavor>/GoogleService-Info.plist`

---

## How to Run the App

Always pass the matching `--flavor` when launching:

```bash
# Run Sandbox (Development)
flutter run --flavor sandbox -t lib/main_development.dart

# Run Sandbox (Staging)
flutter run --flavor sandbox -t lib/main_staging.dart

# Run Live (Production)
flutter run --flavor live -t lib/main_production.dart
```

In VS Code or Android Studio, select the corresponding launch configuration from the run dropdown.

---

## Common Issues & How to Fix Them

### 1. `cannot load such file -- xcodeproj (LoadError)`
**What happened:** FlutterFire used macOS's system Ruby instead of Homebrew's Ruby.  
**Fix:** Run `export PATH="/opt/homebrew/opt/ruby/bin:$PATH"` and `gem install xcodeproj`, then re-run `flutterfire configure`.

### 2. `GoogleService-Info.plist not found for flavor 'sandbox' / 'live'`
**What happened:** The file is missing or in the wrong place.  
**Fix:** Make sure the plist is inside `ios/config/live/` or `ios/config/sandbox/`.

### 3. `No matching client found for package name ...` on Android
**What happened:** The `google-services.json` file doesn't have an entry for the package name you're building.  
**Fix:** 
- Sandbox needs `com.em.starter.sandbox`
- Live needs `com.em.starter`  
Add the missing app in Firebase Console under Project Settings, then re-download the JSON.

### 4. Push notifications not working on iOS
**What happened:** The APNs authentication key (`.p8`) hasn't been uploaded to Firebase.  
**Fix:** Generate an APNs key in your Apple Developer account, then upload it in Firebase Console under **Project Settings ➔ Cloud Messaging ➔ Apple app configuration**.

