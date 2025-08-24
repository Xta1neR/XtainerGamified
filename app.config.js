import 'dotenv/config';

export default {
  expo: {
    name: "Be Xta1neR",
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
    updates: {
      fallbackToCacheTimeout: 0
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
      package: "com.bextainer.solosystem"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [ 
      "expo-router"
    ],
    extra: {
      geminiApiKey: process.env.GEMINI_API_KEY,     
       
      eas: {
        projectId: "f3b8d0f9-551f-4ead-9596-d3e47fb11abf"
      }
    }
  }
};