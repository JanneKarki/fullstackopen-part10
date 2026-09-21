# fullstackopen-part10

React Native

---

## Rate Repository App

A mobile application for rating GitHub repositories. Users can browse GitHub-style
repositories, view individual repository details and reviews, and create new reviews when
signed in. The app is built with React Native and Expo, and it uses a GraphQL API as its
backend. Created as part of Full Stack Open, part 10.

### Try the App on Your Phone

You can try the app on your phone by scanning the following QR code with Expo Go:

![QR code for opening the app in Expo Go](qr.png)

The app is built with Expo SDK 55, so opening it requires an Expo Go version that supports
SDK 55. 

### Try the App in an Android Emulator

With an emulator running and Expo Go for SDK 55 installed in it, this command opens the
published app:

```bash
adb shell am start -a android.intent.action.VIEW \
  -d "exp://u.expo.dev/2085eb2c-5db1-40cd-89af-b142dcb950a5?channel-name=main"
```

### Local run

The application expects a locally running [Rate Repository API](https://github.com/fullstack-hy2020/rate-repository-api). The app reads the API's address from the `EXPO_PUBLIC_APOLLO_URI` variable in rate-repository-app/.env, which defaults to http://localhost:4000/graphql.



```bash
cd rate-repository-app
npm install
npm start
```

### Tests and Eslint

```bash
npm run lint
npm test
```
