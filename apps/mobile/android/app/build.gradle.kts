plugins {
    id("com.android.application")
    id("kotlin-android")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
    id("com.google.gms.google-services")
}

// ─── Release Signing (uncomment when ready) ───
// To enable release signing:
// 1. Copy keystore.properties.example → keystore.properties
// 2. Fill in your keystore credentials
// 3. Uncomment the signingConfigs block below
// 4. In buildTypes.release, change signingConfig to signingConfigs.getByName("release")
//
// val keystorePropertiesFile = rootProject.file("keystore.properties")
// val keystoreProperties = java.util.Properties()
// if (keystorePropertiesFile.exists()) {
//     keystoreProperties.load(java.io.FileInputStream(keystorePropertiesFile))
// }

android {
    namespace = "com.em.starter"
    compileSdk =
        providers
            .gradleProperty("starter.compileSdk")
            .map { it.toInt() }
            .getOrElse(flutter.compileSdkVersion)
    ndkVersion = providers.gradleProperty("starter.ndkVersion").get()

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
        isCoreLibraryDesugaringEnabled = true
    }

    buildFeatures {
        resValues = true
    }

    defaultConfig {
        applicationId = "com.em.starter"
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName
        testInstrumentationRunner = "pl.leancode.patrol.PatrolJUnitRunner"
        testInstrumentationRunnerArguments["clearPackageData"] = "true"
    }

    testOptions {
        execution = "ANDROIDX_TEST_ORCHESTRATOR"
    }

    // ─── Flavors ───
    // Two flavors: sandbox (dev/staging) and live (production).
    // Each gets its own applicationId suffix, app name, and Firebase config.
    //
    // Usage:
    //   flutter run --flavor sandbox -t lib/main_development.dart
    //   flutter run --flavor live    -t lib/main_production.dart
    flavorDimensions += "environment"
    productFlavors {
        create("sandbox") {
            dimension = "environment"
            applicationIdSuffix = ".sandbox"
            resValue("string", "app_name", "Starter Sandbox")
        }
        create("live") {
            dimension = "environment"
            resValue("string", "app_name", "Starter")
        }
    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig = signingConfigs.getByName("debug")

            // Enable code shrinking for release builds
            isMinifyEnabled = true
            isShrinkResources = true

            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
        }
    }
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.1.5")
    androidTestUtil("androidx.test:orchestrator:1.5.1")
}

flutter {
    source = "../.."
}
