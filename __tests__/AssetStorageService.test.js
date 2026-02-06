/**
 * AssetStorageService Tests
 * Tests for CRUD operations on RealEstateAsset records using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  saveAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} from '../src/services/AssetStorageService';
import {createRealEstateAsset, AssetTypes} from '../src/models/RealEstateAsset';

describe('AssetStorageService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getAllAssets', () => {
    it('returns an empty array when no assets are stored', async () => {
      AsyncStorage.getItem.mockResolvedValue(null);

      const assets = await getAllAssets();

      expect(assets).toEqual([]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@jb_assets');
    });

    it('returns all assets from storage', async () => {
      const mockAssets = [
        createRealEstateAsset({assetId: 'asset-1', name: 'Asset 1'}),
        createRealEstateAsset({assetId: 'asset-2', name: 'Asset 2'}),
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockAssets));

      const assets = await getAllAssets();

      expect(assets).toEqual(mockAssets);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@jb_assets');
    });

    it('throws error when AsyncStorage fails', async () => {
      const error = new Error('Storage error');
      AsyncStorage.getItem.mockRejectedValue(error);

      await expect(getAllAssets()).rejects.toThrow('Storage error');
    });
  });

  describe('getAssetById', () => {
    it('returns the asset with matching assetId', async () => {
      const mockAssets = [
        createRealEstateAsset({assetId: 'asset-1', name: 'Asset 1'}),
        createRealEstateAsset({assetId: 'asset-2', name: 'Asset 2'}),
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockAssets));

      const asset = await getAssetById('asset-2');

      expect(asset).toEqual(mockAssets[1]);
    });

    it('returns null when asset is not found', async () => {
      const mockAssets = [
        createRealEstateAsset({assetId: 'asset-1', name: 'Asset 1'}),
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockAssets));

      const asset = await getAssetById('non-existent');

      expect(asset).toBeNull();
    });

    it('uses assetId instead of id or propertyId (domain guideline)', async () => {
      const mockAssets = [
        createRealEstateAsset({assetId: 'asset-1', name: 'Asset 1'}),
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockAssets));

      const asset = await getAssetById('asset-1');

      expect(asset.assetId).toBe('asset-1');
      expect(asset.id).toBeUndefined();
      expect(asset.propertyId).toBeUndefined();
    });
  });

  describe('saveAsset', () => {
    it('saves a new asset to storage', async () => {
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([]));
      const newAsset = createRealEstateAsset({
        assetId: 'asset-1',
        name: 'Test Asset',
        assetType: AssetTypes.CONDO,
      });

      const result = await saveAsset(newAsset);

      expect(result).toEqual(newAsset);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@jb_assets',
        JSON.stringify([newAsset]),
      );
    });

    it('appends new asset to existing assets', async () => {
      const existingAsset = createRealEstateAsset({assetId: 'asset-1', name: 'Asset 1'});
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([existingAsset]));
      
      const newAsset = createRealEstateAsset({assetId: 'asset-2', name: 'Asset 2'});

      await saveAsset(newAsset);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@jb_assets',
        JSON.stringify([existingAsset, newAsset]),
      );
    });

    it('throws error when asset does not have assetId', async () => {
      const invalidAsset = {name: 'Test Asset'};

      await expect(saveAsset(invalidAsset)).rejects.toThrow('Asset must have an assetId');
    });

    it('throws error when asset with same assetId already exists', async () => {
      const existingAsset = createRealEstateAsset({assetId: 'asset-1', name: 'Asset 1'});
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([existingAsset]));
      
      const duplicateAsset = createRealEstateAsset({assetId: 'asset-1', name: 'Duplicate'});

      await expect(saveAsset(duplicateAsset)).rejects.toThrow(
        'Asset with assetId asset-1 already exists',
      );
    });
  });

  describe('updateAsset', () => {
    it('updates an existing asset', async () => {
      const originalAsset = createRealEstateAsset({
        assetId: 'asset-1',
        name: 'Original Name',
      });
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([originalAsset]));

      const updatedAsset = {
        ...originalAsset,
        name: 'Updated Name',
      };

      const result = await updateAsset(updatedAsset);

      expect(result.name).toBe('Updated Name');
      expect(result.assetId).toBe('asset-1');
      expect(result.updatedAt).toBeDefined();
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    it('updates the correct asset among multiple assets', async () => {
      const asset1 = createRealEstateAsset({assetId: 'asset-1', name: 'Asset 1'});
      const asset2 = createRealEstateAsset({assetId: 'asset-2', name: 'Asset 2'});
      const asset3 = createRealEstateAsset({assetId: 'asset-3', name: 'Asset 3'});
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([asset1, asset2, asset3]));

      const updatedAsset2 = {
        ...asset2,
        name: 'Updated Asset 2',
      };

      await updateAsset(updatedAsset2);

      const savedData = JSON.parse(AsyncStorage.setItem.mock.calls[0][1]);
      expect(savedData[0].name).toBe('Asset 1'); // unchanged
      expect(savedData[1].name).toBe('Updated Asset 2'); // updated
      expect(savedData[2].name).toBe('Asset 3'); // unchanged
    });

    it('throws error when asset does not have assetId', async () => {
      const invalidAsset = {name: 'Test Asset'};

      await expect(updateAsset(invalidAsset)).rejects.toThrow('Asset must have an assetId');
    });

    it('throws error when asset is not found', async () => {
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([]));
      
      const asset = createRealEstateAsset({assetId: 'non-existent', name: 'Test'});

      await expect(updateAsset(asset)).rejects.toThrow('Asset with assetId non-existent not found');
    });

    it('updates the updatedAt timestamp', async () => {
      const originalAsset = createRealEstateAsset({
        assetId: 'asset-1',
        name: 'Test Asset',
        updatedAt: '2023-01-01T00:00:00.000Z',
      });
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([originalAsset]));

      const updatedAsset = {
        ...originalAsset,
        name: 'Updated Name',
      };

      const result = await updateAsset(updatedAsset);

      expect(result.updatedAt).not.toBe('2023-01-01T00:00:00.000Z');
    });
  });

  describe('deleteAsset', () => {
    it('deletes an asset by assetId', async () => {
      const asset1 = createRealEstateAsset({assetId: 'asset-1', name: 'Asset 1'});
      const asset2 = createRealEstateAsset({assetId: 'asset-2', name: 'Asset 2'});
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([asset1, asset2]));

      const result = await deleteAsset('asset-1');

      expect(result).toBe(true);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@jb_assets',
        JSON.stringify([asset2]),
      );
    });

    it('returns false when asset is not found', async () => {
      const asset1 = createRealEstateAsset({assetId: 'asset-1', name: 'Asset 1'});
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([asset1]));

      const result = await deleteAsset('non-existent');

      expect(result).toBe(false);
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });

    it('deletes the correct asset among multiple assets', async () => {
      const asset1 = createRealEstateAsset({assetId: 'asset-1', name: 'Asset 1'});
      const asset2 = createRealEstateAsset({assetId: 'asset-2', name: 'Asset 2'});
      const asset3 = createRealEstateAsset({assetId: 'asset-3', name: 'Asset 3'});
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([asset1, asset2, asset3]));

      await deleteAsset('asset-2');

      const savedData = JSON.parse(AsyncStorage.setItem.mock.calls[0][1]);
      expect(savedData).toHaveLength(2);
      expect(savedData[0].assetId).toBe('asset-1');
      expect(savedData[1].assetId).toBe('asset-3');
    });
  });

  describe('Storage key', () => {
    it('uses @jb_assets as the storage key', async () => {
      AsyncStorage.getItem.mockResolvedValue(null);

      await getAllAssets();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@jb_assets');
    });
  });
});
