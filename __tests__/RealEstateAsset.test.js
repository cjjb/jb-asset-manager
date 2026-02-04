/**
 * RealEstateAsset Model Tests
 * Tests for the RealEstateAsset model and its factory function
 */

import {
  createRealEstateAsset,
  AssetTypes,
  AssetTypeIcons,
  AssetTypeLabels,
} from '../src/models/RealEstateAsset';

describe('RealEstateAsset Model', () => {
  describe('createRealEstateAsset', () => {
    it('creates a real estate asset with default values', () => {
      const asset = createRealEstateAsset();
      
      expect(asset).toBeDefined();
      expect(asset.assetId).toBeDefined();
      expect(asset.name).toBe('');
      expect(asset.assetType).toBe(AssetTypes.APARTMENT_BUILDING);
      expect(asset.address).toBeDefined();
      expect(asset.description).toBe('');
      expect(asset.notes).toBe('');
      expect(asset.createdAt).toBeDefined();
      expect(asset.updatedAt).toBeDefined();
    });

    it('creates a real estate asset with provided data', () => {
      const data = {
        assetId: 'asset-123',
        name: 'Sunset Apartments',
        assetType: AssetTypes.CONDO,
        address: {
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
          country: 'USA',
        },
        description: 'Beautiful waterfront condo',
        notes: 'Recently renovated',
      };

      const asset = createRealEstateAsset(data);

      expect(asset.assetId).toBe('asset-123');
      expect(asset.name).toBe('Sunset Apartments');
      expect(asset.assetType).toBe(AssetTypes.CONDO);
      expect(asset.address.street).toBe('123 Main St');
      expect(asset.address.city).toBe('San Francisco');
      expect(asset.description).toBe('Beautiful waterfront condo');
      expect(asset.notes).toBe('Recently renovated');
    });

    it('uses assetId instead of generic id (domain guideline)', () => {
      const asset = createRealEstateAsset();
      
      expect(asset.assetId).toBeDefined();
      expect(asset.id).toBeUndefined();
    });

    it('uses assetType instead of type (domain guideline)', () => {
      const asset = createRealEstateAsset();
      
      expect(asset.assetType).toBeDefined();
      expect(asset.type).toBeUndefined();
    });
  });

  describe('AssetTypes', () => {
    it('defines all asset types', () => {
      expect(AssetTypes.APARTMENT_BUILDING).toBe('apartment_building');
      expect(AssetTypes.CONDO).toBe('condo');
      expect(AssetTypes.BEACH_HOUSE).toBe('beach_house');
      expect(AssetTypes.TOWN_HOUSE).toBe('town_house');
      expect(AssetTypes.COUNTRY_HOUSE).toBe('country_house');
    });
  });

  describe('AssetTypeIcons', () => {
    it('defines icons for all asset types', () => {
      Object.values(AssetTypes).forEach(type => {
        expect(AssetTypeIcons[type]).toBeDefined();
      });
    });
  });

  describe('AssetTypeLabels', () => {
    it('defines labels for all asset types', () => {
      Object.values(AssetTypes).forEach(type => {
        expect(AssetTypeLabels[type]).toBeDefined();
      });
    });
  });
});
