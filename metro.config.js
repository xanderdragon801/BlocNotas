const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver.resolverMainFields = ["react-native", "browser", "main"];

  return config;
})();
