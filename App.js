/**
 * JB Asset Manager - Main App Component
 * Property management mobile application
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GuestWelcome from './src/components/GuestWelcome';
import AddRealEstateAssetScreen from './src/screens/AddRealEstateAssetScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={GuestWelcome} />
        <Stack.Screen name="AddRealEstateAsset" component={AddRealEstateAssetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
