/**
 * Location Model
 * Represents a location where properties are grouped
 */

export const LocationTypes = {
  APARTMENT_BUILDING: 'apartment_building',
  CONDO: 'condo',
  BEACH_HOUSE: 'beach_house',
  TOWN_HOUSE: 'town_house',
  COUNTRY_HOUSE: 'country_house',
};

export const LocationTypeIcons = {
  [LocationTypes.APARTMENT_BUILDING]: 'apartment',
  [LocationTypes.CONDO]: 'domain',
  [LocationTypes.BEACH_HOUSE]: 'beach-access',
  [LocationTypes.TOWN_HOUSE]: 'home',
  [LocationTypes.COUNTRY_HOUSE]: 'nature-people',
};

export const LocationTypeLabels = {
  [LocationTypes.APARTMENT_BUILDING]: 'Apartment Building',
  [LocationTypes.CONDO]: 'Condo',
  [LocationTypes.BEACH_HOUSE]: 'Beach House',
  [LocationTypes.TOWN_HOUSE]: 'Town House',
  [LocationTypes.COUNTRY_HOUSE]: 'Country House',
};

/**
 * Create a new location object
 */
export const createLocation = (data = {}) => {
  return {
    id: data.id || Date.now().toString(),
    name: data.name || '',
    type: data.type || LocationTypes.APARTMENT_BUILDING,
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
