/**
 * Entry Point - JB Asset Manager Mobile App
 * Main entry point that registers the root App component with React Native
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
