/**
 * JB Asset Manager - Main App Component
 * Property management mobile application
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GuestWelcome from './src/components/GuestWelcome';
import AssetListScreen from './src/screens/AssetListScreen';
import AddRealEstateAssetScreen from './src/screens/AddRealEstateAssetScreen';
import AssetDetailScreen from './src/screens/AssetDetailScreen';

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
        <Stack.Screen name="AssetList" component={AssetListScreen} />
        <Stack.Screen name="AddRealEstateAsset" component={AddRealEstateAssetScreen} />
        <Stack.Screen name="AssetDetail" component={AssetDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
