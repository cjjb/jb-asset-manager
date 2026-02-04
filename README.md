# jb-asset-manager

This mobile application helps manage rental properties and their schedule and non-schedule maintenance so that the manager or owner can keep track of costs and income.

## Features

- Cross-platform mobile app (iOS & Android)
- Guest welcome page
- Property management capabilities

## Getting Started

### Prerequisites

- Node.js (>= 18)
- React Native CLI
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

### Running the App

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

### Development

Start the Metro bundler:
```bash
npm start
```

## Project Structure

```
jb-asset-manager/
├── src/
│   └── components/
│       └── GuestWelcome.js    # Welcome page component
├── android/                    # Android native code
├── ios/                        # iOS native code
├── App.js                      # Main app component
├── index.js                    # Entry point
└── package.json               # Dependencies
```
