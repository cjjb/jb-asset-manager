/**
 * App Test Suite
 * Tests for main application components including GuestWelcome, AssetListScreen, and AddRealEstateAssetScreen
 */

import 'react-native';
import React from 'react';
import GuestWelcome from '../src/components/GuestWelcome';
import AssetListScreen from '../src/screens/AssetListScreen';
import AddRealEstateAssetScreen from '../src/screens/AddRealEstateAssetScreen';

// Note: import explicitly to use the types shipped with jest.
import {it, describe} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(() => jest.fn()),
};

describe('Components', () => {
  it('renders GuestWelcome correctly', () => {
    const tree = renderer.create(<GuestWelcome navigation={mockNavigation} />);
    expect(tree).toBeDefined();
  });

  it('renders AssetListScreen correctly', () => {
    const tree = renderer.create(<AssetListScreen navigation={mockNavigation} />);
    expect(tree).toBeDefined();
  });

  it('renders AddRealEstateAssetScreen correctly', () => {
    const tree = renderer.create(<AddRealEstateAssetScreen navigation={mockNavigation} />);
    expect(tree).toBeDefined();
  });
});
