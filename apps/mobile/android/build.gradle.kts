import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.dsl.KotlinAndroidProjectExtension

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val newBuildDir: Directory =
    rootProject.layout.buildDirectory
        .dir("../../build")
        .get()
rootProject.layout.buildDirectory.value(newBuildDir)

subprojects {
    val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
    project.layout.buildDirectory.value(newSubprojectBuildDir)
}
subprojects {
    project.evaluationDependsOn(":app")
}

subprojects {
    if (project.name == "otp_autofill") {
        afterEvaluate {
            val androidExt = project.extensions.findByName("android")
            if (androidExt is com.android.build.gradle.BaseExtension) {
                val otpCompileSdk =
                    providers
                        .gradleProperty("starter.otpAutofillCompileSdk")
                        .map { it.toInt() }
                        .getOrElse(34)
                androidExt.compileSdkVersion(otpCompileSdk)
            }
        }
    }
}

// stripe_android 14.0.1 assumes AGP 9 uses built-in Kotlin. While Flutter's
// legacy Kotlin compatibility mode is needed, match Stripe's Java 17 target
// explicitly instead of inheriting the build machine's JDK version.
subprojects {
    if (name == "stripe_android") {
        plugins.withId("org.jetbrains.kotlin.android") {
            extensions.configure<KotlinAndroidProjectExtension> {
                compilerOptions.jvmTarget.set(JvmTarget.JVM_17)
            }
        }
        plugins.withId("com.android.library") {
            val androidExt = extensions.findByName("android")
            if (androidExt is com.android.build.gradle.BaseExtension) {
                androidExt.lintOptions.isCheckReleaseBuilds = false
                androidExt.lintOptions.isAbortOnError = false
            }
        }
        tasks.matching { it.name.startsWith("lintVital") }.configureEach {
            enabled = false
        }
    }
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}
