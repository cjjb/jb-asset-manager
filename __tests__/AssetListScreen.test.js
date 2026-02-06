/**
 * AssetListScreen Test Suite
 * Tests for the asset list screen component
 */

import 'react-native';
import React from 'react';
import {it, describe, jest, beforeEach} from '@jest/globals';
import renderer from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AssetListScreen from '../src/screens/AssetListScreen';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(() => jest.fn()),
};

describe('AssetListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with empty state', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    
    const tree = renderer.create(
      <AssetListScreen navigation={mockNavigation} />
    );
    
    // Wait for async operations
    await renderer.act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(tree).toBeDefined();
    const instance = tree.root;
    
    // Check for empty state text
    const texts = instance.findAllByType('Text', {deep: true});
    const emptyStateText = texts.find(t => t.props.children === 'No assets yet');
    expect(emptyStateText).toBeDefined();
  });

  it('renders correctly with assets', async () => {
    const mockAssets = [
      {
        assetId: '1',
        name: 'Test Asset 1',
        assetType: 'apartment_building',
        address: {
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
          country: 'USA',
        },
      },
      {
        assetId: '2',
        name: 'Test Asset 2',
        assetType: 'condo',
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'USA',
        },
      },
    ];

    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockAssets));
    
    const tree = renderer.create(
      <AssetListScreen navigation={mockNavigation} />
    );
    
    // Wait for async operations
    await renderer.act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(tree).toBeDefined();
    const instance = tree.root;
    
    // Check that asset names are rendered
    const texts = instance.findAllByType('Text', {deep: true});
    const asset1Name = texts.find(t => t.props.children === 'Test Asset 1');
    const asset2Name = texts.find(t => t.props.children === 'Test Asset 2');
    
    expect(asset1Name).toBeDefined();
    expect(asset2Name).toBeDefined();
    
    // Check that cities are rendered
    const asset1City = texts.find(t => t.props.children === 'San Francisco');
    const asset2City = texts.find(t => t.props.children === 'Los Angeles');
    
    expect(asset1City).toBeDefined();
    expect(asset2City).toBeDefined();
  });

  it('calls AsyncStorage.getItem on mount', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    
    renderer.create(
      <AssetListScreen navigation={mockNavigation} />
    );
    
    // Wait for async operations
    await renderer.act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('@jb_assets');
  });
});
