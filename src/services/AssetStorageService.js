/**
 * AssetStorageService
 * Provides CRUD operations for RealEstateAsset records using AsyncStorage
 * Storage key: @jb_assets
 * Domain notes: Uses assetId (never id or propertyId)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@jb_assets';

/**
 * Get all assets from storage
 * @returns {Promise<Array>} Array of RealEstateAsset objects
 */
export const getAllAssets = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting all assets:', error);
    throw error;
  }
};

/**
 * Get a single asset by assetId
 * @param {string} assetId - The unique identifier for the asset
 * @returns {Promise<Object|null>} The asset object or null if not found
 */
export const getAssetById = async (assetId) => {
  try {
    const assets = await getAllAssets();
    return assets.find(asset => asset.assetId === assetId) || null;
  } catch (error) {
    console.error('Error getting asset by id:', error);
    throw error;
  }
};

/**
 * Save a new asset to storage
 * @param {Object} asset - The RealEstateAsset object to save
 * @returns {Promise<Object>} The saved asset object
 */
export const saveAsset = async (asset) => {
  try {
    if (!asset.assetId) {
      throw new Error('Asset must have an assetId');
    }

    const assets = await getAllAssets();
    
    // Check if asset already exists
    const existingIndex = assets.findIndex(a => a.assetId === asset.assetId);
    if (existingIndex !== -1) {
      throw new Error(`Asset with assetId ${asset.assetId} already exists. Use updateAsset instead.`);
    }

    // Add new asset
    assets.push(asset);
    
    const jsonValue = JSON.stringify(assets);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    
    return asset;
  } catch (error) {
    console.error('Error saving asset:', error);
    throw error;
  }
};

/**
 * Update an existing asset in storage
 * @param {Object} asset - The RealEstateAsset object with updated data
 * @returns {Promise<Object>} The updated asset object
 */
export const updateAsset = async (asset) => {
  try {
    if (!asset.assetId) {
      throw new Error('Asset must have an assetId');
    }

    const assets = await getAllAssets();
    const existingIndex = assets.findIndex(a => a.assetId === asset.assetId);
    
    if (existingIndex === -1) {
      throw new Error(`Asset with assetId ${asset.assetId} not found`);
    }

    // Update the asset
    assets[existingIndex] = {
      ...asset,
      updatedAt: new Date().toISOString(),
    };
    
    const jsonValue = JSON.stringify(assets);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    
    return assets[existingIndex];
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
};

/**
 * Delete an asset from storage by assetId
 * @param {string} assetId - The unique identifier for the asset to delete
 * @returns {Promise<boolean>} True if asset was deleted, false if not found
 */
export const deleteAsset = async (assetId) => {
  try {
    const assets = await getAllAssets();
    const filteredAssets = assets.filter(asset => asset.assetId !== assetId);
    
    if (filteredAssets.length === assets.length) {
      return false; // Asset not found
    }
    
    const jsonValue = JSON.stringify(filteredAssets);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    
    return true;
  } catch (error) {
    console.error('Error deleting asset:', error);
    throw error;
  }
};
