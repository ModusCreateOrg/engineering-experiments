# About this experiment
<p>
  <!-- iOS -->
  <img alt="Supports iOS" longdesc="Supports iOS" src="https://img.shields.io/badge/iOS-Native%20-%23bbb" />
  <!-- Android -->
  <img alt="Supports Android" longdesc="Supports Android" src="https://img.shields.io/badge/Android-Native%20-%23bbb" />
  <!-- NextJS -->
  <img alt="Supports NextJS" longdesc="Supports NextJS" src="https://img.shields.io/badge/NextJS-Web-%23bbb" />
</p>

This project aims to demonstrate how to work with **React Native** as a cross-platform solution and additionally solve a few paradigms for things like navigation, bottom sheet, media queries, permissions, SSR* (web only), and platform specific code. 

> 🚨 SSR is an experimental feature with Expo so modules might not be fully optimized for Next.js. If you find bugs please report them on the [Expo repo](https://github.com/expo/expo/issues) or [expo-cli repo](https://github.com/expo/expo-cli/issues) with the `[nextjs]` tag in the title.

### Getting started

**Setup**

1. Clone the `js-coe` repository
2. cd into the project folder (jscoe-151-react-native-nextjs)

**Installation**

3. Run `yarn install` to install the project dependencies.

> The setup flow could vary greatly between MacOS, Linux and Windows so make sure to follow the instructions on How To Install React Native on your system.

### Running the project

So as you probably figured out, this project consists of two workflows: one being the mobile flow and the other being the web flow.

You can run both workflows simultaneously with the following commands:

**Mobile**

```
# for iOS
expo start --ios

# for Android
expo start --android
```

**Web**
```
yarn next dev
```

### Notes
For the most updated guide you should refer to the Expo docs: [Using Next.js](https://docs.expo.dev/versions/latest/guides/using-nextjs/). Here are the [latest docs on master](https://github.com/expo/expo/blob/master/docs/pages/guides/using-nextjs.md).

### 👀 More Info

- [Next Adapter repo](https://github.com/expo/expo-cli/tree/master/packages/next-adapter)
