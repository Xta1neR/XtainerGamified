import 'dotenv/config';

export default {
  expo: {
    name: "Be Xtainer",
    slug: "be-xtainer",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.xtainer.bextainer",
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "INTERNET"
      ]
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-blur",
      "expo-linear-gradient",
      "expo-haptics",
      "expo-clipboard",
      "expo-image",
      "expo-web-browser",
      "expo-constants",
      "@react-native-async-storage/async-storage",
      "@react-native-community/slider",
      "react-native-gesture-handler",
      "react-native-reanimated",
      "react-native-safe-area-context",
      "react-native-screens",
      "react-native-webview",
      "react-native-svg",
      "@react-native-picker/picker",
      "react-native-circular-progress",
      "react-native-circular-progress-indicator"
    ],
    extra: {
      geminiApiKey: process.env.GEMINI_API_KEY,
      eas: {
        projectId: "f3b8d0f9-551f-4ead-9596-d3e47fb11abf"
      }
    }
  }
};
