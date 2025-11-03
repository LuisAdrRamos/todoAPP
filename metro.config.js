const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
// Agregar la extensión 'cjs' para que Firebase funcione correctamente
defaultConfig.resolver.sourceExts.push('cjs'); 

module.exports = defaultConfig;