// @generated: @expo/next-adapter@2.1.52
// Learn more: https://docs.expo.io/guides/using-nextjs/

const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');
const withImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  withFonts,
  withImages,
  [
    withExpo,
    { projectRoot: __dirname }
  ]
]);
