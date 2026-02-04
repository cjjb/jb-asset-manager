plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

android {
    namespace = "com.jbassetmanager"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.jbassetmanager"
        minSdk = 23
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}

dependencies {
    implementation("com.facebook.react:react-android")
    implementation("com.facebook.react:react-native")
}
