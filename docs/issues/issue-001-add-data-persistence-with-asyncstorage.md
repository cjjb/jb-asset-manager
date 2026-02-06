# Issue 1: Add Data Persistence with AsyncStorage

> **GitHub Issue Title**: Add Data Persistence with AsyncStorage
>
> **Labels**: `enhancement`, `P0`, `phase-1`, `poc`

## Priority

P0 — **Blocker** for all other features. This is the first issue in the development plan and must be completed before any other issue can begin.

## Description

Integrate `@react-native-async-storage/async-storage` to persist `RealEstateAsset` records on-device. Currently, the "Add Real Estate Asset" form (`AddRealEstateAssetScreen.js`) creates an asset object but only shows an `Alert` without saving data anywhere. This issue adds a storage service that provides full CRUD operations so asset data persists between app sessions.

## Context for Agents

### Current Codebase State

- **RealEstateAsset model** exists at `src/models/RealEstateAsset.js`. It exports:
  - `AssetTypes` — enum of asset types (`apartment_building`, `condo`, `beach_house`, `town_house`, `country_house`)
  - `AssetTypeIcons` — mapping of asset types to Material Icons names
  - `AssetTypeLabels` — human-readable labels for asset types
  - `createRealEstateAsset(data)` — factory function that creates an asset object with `assetId`, `name`, `assetType`, `address` (street, city, state, zipCode, country), `description`, `notes`, `createdAt`, `updatedAt`
- **AddRealEstateAssetScreen** exists at `src/screens/AddRealEstateAssetScreen.js`. The `handleSave()` function currently:
  1. Validates that `name`, `street`, and `city` are non-empty
  2. Calls `createRealEstateAsset(...)` to build the asset object
  3. Shows a success `Alert` and navigates back — **but does NOT persist the data**
  4. The comments in the code say `// For now, just show success message` and `// In a real app, this would save to a database`
- **Navigation**: Stack Navigator with two screens — `GuestWelcome` → `AddRealEstateAsset`
- **Testing**: Jest with React Native preset, 9 tests currently passing. Mocks are in `jest.setup.js`.
- **No `src/services/` directory** exists yet — you need to create it.

### Domain Rules

- **NEVER** use the word "Property" as an entity or variable name. Use `RealEstateAsset`.
- Use **scoped identifiers**: `assetId` (not `id` or `propertyId`)
- The storage key must be `@jb_assets` (following AsyncStorage key naming conventions)
- Follow naming from `docs/agents/AGENTS_DOMAIN.md`

### Technical Requirements

- Install `@react-native-async-storage/async-storage` as a dependency
- Create `src/services/AssetStorageService.js` with these exported functions:
  - `saveAsset(asset)` — Save a new asset to storage
  - `getAllAssets()` — Retrieve all saved assets
  - `getAssetById(assetId)` — Retrieve a single asset by its `assetId`
  - `updateAsset(asset)` — Update an existing asset (match by `assetId`)
  - `deleteAsset(assetId)` — Remove an asset by its `assetId`
- All functions should use AsyncStorage with the key `@jb_assets`
- Data should be stored as a JSON-serialized array of asset objects
- Modify `AddRealEstateAssetScreen.js` so that `handleSave()` calls `saveAsset(newAsset)` before showing the success alert
- Handle errors gracefully (try/catch around AsyncStorage calls)

## Files to Create/Modify

| Action | File Path | Notes |
|--------|-----------|-------|
| Create | `src/services/AssetStorageService.js` | New storage service module |
| Modify | `src/screens/AddRealEstateAssetScreen.js` | Import `saveAsset` and call it in `handleSave()` |
| Modify | `package.json` | Add `@react-native-async-storage/async-storage` dependency |
| Create | `__tests__/AssetStorageService-test.js` | Unit tests for the storage service |

## Acceptance Criteria

- [ ] `AssetStorageService` exports: `saveAsset(asset)`, `getAllAssets()`, `getAssetById(assetId)`, `updateAsset(asset)`, `deleteAsset(assetId)`
- [ ] All functions use AsyncStorage with a `@jb_assets` storage key
- [ ] `AddRealEstateAssetScreen` calls `saveAsset()` on successful form submission
- [ ] Unit tests for `AssetStorageService` (mock AsyncStorage)
- [ ] All existing tests still pass (currently 9 tests)

## Implementation Hints

1. **AsyncStorage** stores key-value pairs where values are strings. Store the assets array as `JSON.stringify(assets)` and parse with `JSON.parse()` on read.
2. **Pattern for the storage service**:
   ```javascript
   import AsyncStorage from '@react-native-async-storage/async-storage';

   const STORAGE_KEY = '@jb_assets';

   export const saveAsset = async (asset) => {
     // Get existing assets, add new one, save back
   };
   ```
3. **Mocking AsyncStorage in tests**: Add a mock in `jest.setup.js` or at the top of the test file:
   ```javascript
   jest.mock('@react-native-async-storage/async-storage', () => ({
     getItem: jest.fn(),
     setItem: jest.fn(),
   }));
   ```
4. **Updating AddRealEstateAssetScreen**: Replace the placeholder comment with an actual `saveAsset()` call. Keep the success Alert but only show it after the save succeeds. Handle save failures with an error Alert.

## Definition of Done

- All acceptance criteria checkboxes are checked
- All existing tests pass (`npm test`)
- New tests for `AssetStorageService` pass
- The `AddRealEstateAssetScreen` persists data via the service
- Code follows project conventions (JSDoc headers, StyleSheet, functional components)
- `docs/DEVELOPMENT_PLAN.md` is updated to reflect the issue status at each step: `🔧 In Progress` when starting, `🔍 In Review` when a PR is submitted, `✅ Done` when the PR is merged and issue closed
