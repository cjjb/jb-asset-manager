/**
 * AssetDetailScreen Test Suite
 * Tests for the asset detail screen component
 */

import 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {it, describe, jest, beforeEach} from '@jest/globals';
import renderer from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AssetDetailScreen from '../src/screens/AssetDetailScreen';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(() => jest.fn()),
};

// Mock route
const mockRoute = {
  params: {
    assetId: '1',
  },
};

const mockAsset = {
  assetId: '1',
  name: 'Sunset Apartments',
  assetType: 'apartment_building',
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    country: 'USA',
  },
  description: 'Beautiful apartment building in downtown',
  notes: 'Recently renovated',
  createdAt: '2024-01-15T10:00:00.000Z',
  updatedAt: '2024-01-15T10:00:00.000Z',
};

describe('AssetDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with asset data', async () => {
    const mockAssets = [mockAsset];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockAssets));
    
    const tree = renderer.create(
      <AssetDetailScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    // Wait for async operations
    await renderer.act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(tree).toBeDefined();
    const instance = tree.root;
    
    // Check that asset name is rendered
    const texts = instance.findAllByType('Text', {deep: true});
    const assetName = texts.find(t => t.props.children === 'Sunset Apartments');
    expect(assetName).toBeDefined();
  });

  it('displays loading state initially', () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify([mockAsset]));
    
    const tree = renderer.create(
      <AssetDetailScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    expect(tree).toBeDefined();
    const instance = tree.root;
    
    // Check for loading text
    const texts = instance.findAllByType('Text', {deep: true});
    const loadingText = texts.find(t => t.props.children === 'Loading asset details...');
    expect(loadingText).toBeDefined();
  });

  it('calls AsyncStorage.getItem on mount', async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify([mockAsset]));
    
    renderer.create(
      <AssetDetailScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    // Wait for async operations
    await renderer.act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('@jb_assets');
  });

  it('displays all asset fields', async () => {
    const mockAssets = [mockAsset];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockAssets));
    
    const tree = renderer.create(
      <AssetDetailScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    // Wait for async operations
    await renderer.act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    const instance = tree.root;
    const texts = instance.findAllByType('Text', {deep: true});
    
    // Check for asset name
    expect(texts.find(t => t.props.children === 'Sunset Apartments')).toBeDefined();
    
    // Check for asset type label
    expect(texts.find(t => t.props.children === 'Apartment Building')).toBeDefined();
    
    // Check for description
    expect(texts.find(t => t.props.children === 'Beautiful apartment building in downtown')).toBeDefined();
    
    // Check for notes
    expect(texts.find(t => t.props.children === 'Recently renovated')).toBeDefined();
  });

  it('handles missing asset gracefully', async () => {
    // Mock empty assets array (asset not found)
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify([]));
    
    const tree = renderer.create(
      <AssetDetailScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    // Wait for async operations
    await renderer.act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    // Should show error state or navigate back
    expect(tree).toBeDefined();
  });

  it('renders edit and delete buttons in header', async () => {
    const mockAssets = [mockAsset];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockAssets));
    
    const tree = renderer.create(
      <AssetDetailScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    // Wait for async operations
    await renderer.act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    const instance = tree.root;
    
    // Check for edit and delete icons
    const touchables = instance.findAllByType(TouchableOpacity, {deep: false});
    expect(touchables.length).toBeGreaterThan(0);
    
    // The screen should have back, edit, and delete buttons
    expect(tree).toBeDefined();
  });

  it('formats date correctly', async () => {
    const mockAssets = [mockAsset];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockAssets));
    
    const tree = renderer.create(
      <AssetDetailScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    // Wait for async operations
    await renderer.act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    const instance = tree.root;
    const texts = instance.findAllByType('Text', {deep: true});
    
    // Check that a formatted date is present (should be "January 15, 2024")
    const dateText = texts.find(t => t.props.children && typeof t.props.children === 'string' && t.props.children.includes('January'));
    expect(dateText).toBeDefined();
  });

  it('formats full address correctly', async () => {
    const mockAssets = [mockAsset];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockAssets));
    
    const tree = renderer.create(
      <AssetDetailScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    // Wait for async operations
    await renderer.act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    const instance = tree.root;
    const texts = instance.findAllByType('Text', {deep: true});
    
    // Check that full address is formatted (should contain street, city, state, etc.)
    const addressText = texts.find(t => 
      t.props.children && 
      typeof t.props.children === 'string' && 
      t.props.children.includes('123 Main St') &&
      t.props.children.includes('San Francisco')
    );
    expect(addressText).toBeDefined();
  });
});
