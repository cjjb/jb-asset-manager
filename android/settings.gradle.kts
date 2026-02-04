pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven {
            url = uri("../node_modules/react-native/android")
        }
    }
}

rootProject.name = "JBAssetManager"
include(":app")
