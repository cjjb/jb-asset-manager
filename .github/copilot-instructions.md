# GitHub Copilot Instructions for JB Asset Manager

## Project Overview

JB Asset Manager is a cross-platform mobile application built with React Native to help property managers and owners manage rental properties, track maintenance schedules, monitor costs, and manage income.

## Technology Stack

- **Framework**: React Native 0.73.2
- **Language**: JavaScript (ES6+)
- **Navigation**: React Navigation v7 (Stack Navigator)
- **UI Components**: React Native core components
- **Icons**: react-native-vector-icons (MaterialIcons)
- **Testing**: Jest with React Native preset
- **Package Manager**: npm
- **Supported Platforms**: iOS and Android

## Project Structure

```
jb-asset-manager/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── GuestWelcome.js
│   ├── models/          # Data models and schemas
│   │   └── Location.js
│   └── screens/         # Screen components
│       └── AddLocationScreen.js
├── android/             # Android native code
├── ios/                 # iOS native code
├── __tests__/          # Test files
├── App.js              # Main app component with navigation setup
├── index.js            # Entry point
├── jest.setup.js       # Jest configuration and mocks
└── package.json        # Dependencies and scripts
```

## Development Guidelines

### Code Organization

- **Components**: Place reusable UI components in `src/components/`
- **Screens**: Place full-screen components in `src/screens/`
- **Models**: Place data models and business logic in `src/models/`
- **Navigation**: Main navigation setup is in `App.js`

### Coding Standards

1. **File Headers**: Include JSDoc-style comments at the top of files describing their purpose
   ```javascript
   /**
    * Component Name - Brief Description
    * Detailed description if needed
    */
   ```

2. **Component Structure**:
   - Use functional components with hooks
   - Import React Native components explicitly
   - Define styles using `StyleSheet.create()` at the bottom of the file
   - Export components as default exports

3. **Naming Conventions**:
   - Components: PascalCase (e.g., `GuestWelcome`, `AddLocationScreen`)
   - Files: Match component name (e.g., `GuestWelcome.js`)
   - Style names: camelCase (e.g., `container`, `primaryButton`)
   - Screen components: Use `Screen` suffix (e.g., `AddLocationScreen`)

4. **Styling**:
   - Use StyleSheet.create() for all styles
   - Define styles at the end of the file
   - Group related styles together
   - Use consistent spacing and color values
   - Common colors: Primary blue `#3498db`, Dark text `#2c3e50`, Light text `#7f8c8d`

5. **Navigation**:
   - Use React Navigation for all navigation needs
   - Access navigation via props: `({navigation}) => {}`
   - Navigate with: `navigation.navigate('ScreenName')`

### Testing

- Test files are located in `__tests__/` directory
- Use Jest as the test runner
- Mock native modules in `jest.setup.js`
- Follow React Native testing patterns
- Run tests with: `npm test`

### Development Workflow

1. **Setup**:
   ```bash
   npm install
   cd ios && pod install && cd ..  # For iOS only
   ```

2. **Running the App**:
   - Start Metro: `npm start`
   - Run on iOS: `npm run ios`
   - Run on Android: `npm run android`

3. **Testing**:
   - Run tests: `npm test`

### Important Notes for Copilot

- This is a React Native project, not a web React project
- Use React Native components (View, Text, TouchableOpacity) instead of HTML elements
- Use StyleSheet for styling instead of CSS
- SafeAreaView is used for proper layout on modern devices
- Vector icons are from 'react-native-vector-icons/MaterialIcons'
- Navigation is handled by React Navigation, not React Router
- The app targets Node.js >= 18

### Common Patterns

1. **Screen Component Template**:
   ```javascript
   import React from 'react';
   import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
   
   const ScreenName = ({navigation}) => {
     return (
       <SafeAreaView style={styles.container}>
         {/* Content */}
       </SafeAreaView>
     );
   };
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#ffffff',
     },
   });
   
   export default ScreenName;
   ```

2. **Button Pattern**:
   ```javascript
   <TouchableOpacity 
     style={styles.button} 
     onPress={handlePress}>
     <Text style={styles.buttonText}>Label</Text>
   </TouchableOpacity>
   ```

3. **Icon Usage**:
   ```javascript
   import Icon from 'react-native-vector-icons/MaterialIcons';
   <Icon name="icon-name" size={24} color="#000" />
   ```

### Property Management Domain

This app manages rental properties with these key features:
- Property/location management
- Maintenance tracking (scheduled and non-scheduled)
- Cost and income monitoring
- Guest welcome interface

When implementing features, consider the property management context and ensure solutions align with real-world rental property workflows.
