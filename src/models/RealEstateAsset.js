/**
 * RealEstateAsset Model
 * Represents a legally owned real-estate asset
 * Following domain guidelines: uses RealEstateAsset instead of ambiguous "Location" or "Property"
 */

export const AssetTypes = {
  APARTMENT_BUILDING: 'apartment_building',
  CONDO: 'condo',
  BEACH_HOUSE: 'beach_house',
  TOWN_HOUSE: 'town_house',
  COUNTRY_HOUSE: 'country_house',
};

export const AssetTypeIcons = {
  [AssetTypes.APARTMENT_BUILDING]: 'apartment',
  [AssetTypes.CONDO]: 'domain',
  [AssetTypes.BEACH_HOUSE]: 'beach-access',
  [AssetTypes.TOWN_HOUSE]: 'home',
  [AssetTypes.COUNTRY_HOUSE]: 'nature-people',
};

export const AssetTypeLabels = {
  [AssetTypes.APARTMENT_BUILDING]: 'Apartment Building',
  [AssetTypes.CONDO]: 'Condo',
  [AssetTypes.BEACH_HOUSE]: 'Beach House',
  [AssetTypes.TOWN_HOUSE]: 'Town House',
  [AssetTypes.COUNTRY_HOUSE]: 'Country House',
};

/**
 * Create a new real estate asset object
 */
export const createRealEstateAsset = (data = {}) => {
  return {
    assetId: data.assetId || Date.now().toString(),
    name: data.name || '',
    assetType: data.assetType || AssetTypes.APARTMENT_BUILDING,
    address: {
      street: data.address?.street || '',
      city: data.address?.city || '',
      state: data.address?.state || '',
      zipCode: data.address?.zipCode || '',
      country: data.address?.country || '',
    },
    description: data.description || '',
    notes: data.notes || '',
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
};
