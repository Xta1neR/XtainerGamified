// Get the default configuration from Expo
const { getDefaultConfig } = require('expo/metro-config');

// Get the default config for the project root
const config = getDefaultConfig(__dirname);

// This tells the Metro bundler to look for files with these extensions.
// It is the key to resolving issues with libraries like react-native-svg.
config.resolver.sourceExts.push('mjs', 'cjs');

// Export the modified configuration
module.exports = config;