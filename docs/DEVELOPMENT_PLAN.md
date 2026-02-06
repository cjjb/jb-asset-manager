# JB Asset Manager — Development Plan

This document defines the iterative development plan for JB Asset Manager. Issues are numbered sequentially and should be worked on in order. Each issue is self-contained with clear acceptance criteria.

> **Strategy**: Phase 1 delivers a minimal POC that can be demoed to users for feedback. Phases 2 and 3 add depth based on that feedback and may be re-prioritized after the POC demo.

> **Domain Rules**: All entity names follow `docs/agents/AGENTS_DOMAIN.md`. Never use the word "Property" as an entity name. Use `RealEstateAsset`, `RentalUnit`, `Building`, `Parcel`, etc.

---

## Status Tracking

> **IMPORTANT — Keep This Plan Updated**: Every agent or developer working on issues from this plan **must** update this file to reflect the current status of each issue. Update the status after every step in the lifecycle. This ensures all contributors (human or agent) have an accurate view of progress.

### Status Legend

| Status | Meaning |
|--------|---------|
| _(no status)_ | Not yet started, no GitHub issue created |
| 📋 `Issue Created` | GitHub issue has been created; work has not started |
| 🔧 `In Progress` | Work is actively being done on this issue |
| 🔍 `In Review` | A pull request has been submitted and is under review |
| ✅ `Done` | Issue is completed, PR merged, and all acceptance criteria met |
| ⏸️ `Blocked` | Work is blocked by a dependency or external factor |

### How to Update

1. **When a GitHub issue is created**: Add the GitHub issue number and set the status to `📋 Issue Created` next to the issue heading (e.g., `### Issue 1: ... — 📋 Issue Created (GitHub Issue #N)`).
2. **When work begins**: Update the status to `🔧 In Progress`.
3. **When a PR is submitted**: Update the status to `🔍 In Review`.
4. **When the PR is merged and the issue is closed**: Update the status to `✅ Done`.
5. **If work is blocked**: Update the status to `⏸️ Blocked` and add a note explaining the blocker.

### Current Issue Status Summary

| Issue | Title | Status |
|-------|-------|--------|
| 1 | Add Data Persistence with AsyncStorage | ✅ `Done` |
| 2 | Asset List Screen | ✅ `Done` |
| 3 | Asset Detail Screen | _(not started)_ |
| 4 | Edit Asset Screen | _(not started)_ |
| 5 | Delete Asset Functionality | _(not started)_ |
| 6 | MaintenanceRequest Model and Add Screen | _(not started)_ |
| 7 | Maintenance Request List on Asset Detail | _(not started)_ |
| 8 | RentalUnit Model and Add Screen | _(not started)_ |
| 9 | RentalUnit List on Asset Detail | _(not started)_ |
| 10 | Tenant Model and Basic Management | _(not started)_ |
| 11 | LeaseAgreement Model and Creation | _(not started)_ |
| 12 | Update MaintenanceRequest Status | _(not started)_ |
| 13 | Dashboard / Home Screen with Summary | _(not started)_ |
| 14 | RentCharge and Invoice Models | _(not started)_ |
| 15 | Payment Tracking | _(not started)_ |
| 16 | Financial Summary Views | _(not started)_ |
| 17 | Search and Filter Assets | _(not started)_ |
| 18 | WorkOrder Management | _(not started)_ |
| 19 | ServiceProvider Directory | _(not started)_ |

---

## Current State

- ✅ Welcome screen (`GuestWelcome.js`)
- ✅ Add Real Estate Asset form (`AddRealEstateAssetScreen.js`)
- ✅ `RealEstateAsset` model with factory function
- ✅ Navigation (Stack Navigator: Welcome → AddRealEstateAsset)
- ✅ Jest test infrastructure (9 tests passing)
- ❌ No data persistence (save shows Alert only)
- ❌ No asset listing
- ❌ No asset detail view
- ❌ No edit or delete
- ❌ No maintenance tracking
- ❌ No financial features

---

## Phase 1 — POC (Issues 1–7)

**Goal**: A demoable app where users can create, view, edit, and delete real estate assets with basic maintenance requests. Data persists on-device.

---

### Issue 1: Add Data Persistence with AsyncStorage — ✅ `Done`

**Priority**: P0 — Blocker for all other features

**Description**: Integrate `@react-native-async-storage/async-storage` to persist `RealEstateAsset` records on-device. Create a storage service module that provides CRUD operations for assets.

**Files to create/modify**:
- Create `src/services/AssetStorageService.js`
- Modify `src/screens/AddRealEstateAssetScreen.js` (call save on submit)
- Modify `package.json` (add `@react-native-async-storage/async-storage`)

**Acceptance criteria**:
- [ ] `AssetStorageService` exports: `saveAsset(asset)`, `getAllAssets()`, `getAssetById(assetId)`, `updateAsset(asset)`, `deleteAsset(assetId)`
- [ ] All functions use AsyncStorage with a `@jb_assets` storage key
- [ ] `AddRealEstateAssetScreen` calls `saveAsset()` on successful form submission
- [ ] Unit tests for `AssetStorageService` (mock AsyncStorage)
- [ ] All existing tests still pass

**Domain notes**: Storage keys use `assetId`, never `id` or `propertyId`.

---

### Issue 2: Asset List Screen - ✅ `Done`

**Priority**: P0 — Core navigation flow

**Description**: Create a screen that displays all saved `RealEstateAsset` records in a scrollable list. Each list item shows the asset name, type icon, and city. The Welcome screen button changes from "Add Real Estate Asset" to "View My Assets" (or similar), and an "Add" button is available from the list screen.

**Files to create/modify**:
- Create `src/screens/AssetListScreen.js`
- Modify `App.js` (add route)
- Modify `src/components/GuestWelcome.js` (update navigation target)

**Acceptance criteria**:
- [ ] `AssetListScreen` loads assets via `AssetStorageService.getAllAssets()` on mount
- [ ] Each list item displays: asset type icon, asset name, city
- [ ] Tapping a list item navigates to `AssetDetail` (placeholder for Issue 3)
- [ ] Floating or header "+" button navigates to `AddRealEstateAsset`
- [ ] Empty state shown when no assets exist ("No assets yet. Add your first one!")
- [ ] `GuestWelcome` navigates to `AssetList` instead of directly to add form
- [ ] Pull-to-refresh reloads the list
- [ ] Unit tests for component rendering (empty state and with items)
- [ ] All existing tests still pass

---

### Issue 3: Asset Detail Screen

**Priority**: P0 — Users need to view what they saved

**Description**: Create a read-only detail screen for a single `RealEstateAsset`. Displays all fields: name, type, full address, description, and notes. Includes navigation to Edit (Issue 4) and Delete (Issue 5).

**Files to create/modify**:
- Create `src/screens/AssetDetailScreen.js`
- Modify `App.js` (add route)

**Acceptance criteria**:
- [ ] Receives `assetId` via route params
- [ ] Loads asset from `AssetStorageService.getAssetById(assetId)`
- [ ] Displays: name, asset type with icon and label, full address, description, notes, created date
- [ ] Header has back button, edit button (pencil icon), and delete button (trash icon)
- [ ] Edit button navigates to `EditRealEstateAsset` screen (Issue 4)
- [ ] Delete button shows confirmation dialog (Issue 5)
- [ ] Loading state while fetching
- [ ] Unit tests for component rendering
- [ ] All existing tests still pass

---

### Issue 4: Edit Asset Screen

**Priority**: P1 — Essential for POC completeness

**Description**: Create an edit screen that reuses the form layout from `AddRealEstateAssetScreen` but pre-populates fields with existing asset data and calls `updateAsset()` on save.

**Files to create/modify**:
- Create `src/screens/EditRealEstateAssetScreen.js` (or refactor `AddRealEstateAssetScreen` to support edit mode)
- Modify `App.js` (add route)

**Acceptance criteria**:
- [ ] Receives `assetId` via route params
- [ ] Pre-fills all form fields with existing asset data
- [ ] Save calls `AssetStorageService.updateAsset(asset)` with updated `updatedAt` timestamp
- [ ] On success, navigates back to `AssetDetail` with refreshed data
- [ ] Validation rules match the add screen
- [ ] Header title reads "Edit Real Estate Asset"
- [ ] Unit tests for component rendering with pre-filled data
- [ ] All existing tests still pass

---

### Issue 5: Delete Asset Functionality

**Priority**: P1 — Essential CRUD operation

**Description**: Add delete capability to the `AssetDetailScreen`. Tapping the delete icon shows a confirmation alert. On confirm, the asset is deleted from storage and the user returns to the asset list.

**Files to modify**:
- Modify `src/screens/AssetDetailScreen.js` (add delete handler)

**Acceptance criteria**:
- [ ] Delete button on `AssetDetailScreen` triggers a confirmation `Alert` ("Are you sure you want to delete this asset?")
- [ ] "Cancel" dismisses the alert with no action
- [ ] "Delete" calls `AssetStorageService.deleteAsset(assetId)` and navigates back to `AssetList`
- [ ] Asset list refreshes after deletion
- [ ] Unit test for delete confirmation flow
- [ ] All existing tests still pass

---

### Issue 6: MaintenanceRequest Model and Add Screen

**Priority**: P1 — Key differentiator for POC demo

**Description**: Create the `MaintenanceRequest` model and a screen to submit maintenance requests linked to a specific `RealEstateAsset`. This demonstrates the app's core value proposition: tracking maintenance.

**Files to create/modify**:
- Create `src/models/MaintenanceRequest.js`
- Create `src/services/MaintenanceStorageService.js`
- Create `src/screens/AddMaintenanceRequestScreen.js`
- Modify `src/screens/AssetDetailScreen.js` (add "Add Maintenance Request" button)
- Modify `App.js` (add route)

**Acceptance criteria**:
- [ ] `MaintenanceRequest` model includes: `requestId`, `assetId`, `title`, `description`, `priority` (low | medium | high | urgent), `status` (open | in_progress | completed | cancelled), `requestDate`, `completedDate`, `estimatedCost`, `actualCost`, `notes`
- [ ] `MaintenanceStorageService` provides: `saveRequest(request)`, `getRequestsByAssetId(assetId)`, `getAllRequests()`, `updateRequest(request)`, `deleteRequest(requestId)`
- [ ] `AddMaintenanceRequestScreen` includes form fields: title (required), description, priority selector, estimated cost
- [ ] Screen receives `assetId` via route params to link the request
- [ ] On save, persists via `MaintenanceStorageService` and navigates back
- [ ] Unit tests for model and storage service
- [ ] All existing tests still pass

**Domain notes**: Use `MaintenanceRequest` (not "Issue" or "Ticket"). Use `requestId`, never `id`.

---

### Issue 7: Maintenance Request List on Asset Detail

**Priority**: P1 — Completes the maintenance story for POC

**Description**: Show a list of maintenance requests on the `AssetDetailScreen`, giving users visibility into outstanding and completed work for each asset.

**Files to modify**:
- Modify `src/screens/AssetDetailScreen.js` (add maintenance list section)

**Acceptance criteria**:
- [ ] `AssetDetailScreen` loads maintenance requests via `MaintenanceStorageService.getRequestsByAssetId(assetId)`
- [ ] Displays a "Maintenance Requests" section below asset details
- [ ] Each request shows: title, priority badge (color-coded), status badge, date
- [ ] Tapping a request could show details in an expandable view or alert (simple for POC)
- [ ] "Add Maintenance Request" button navigates to `AddMaintenanceRequestScreen`
- [ ] Empty state: "No maintenance requests yet"
- [ ] Count badge or summary (e.g., "3 open, 1 completed")
- [ ] Unit tests for rendering with and without requests
- [ ] All existing tests still pass

---

## Phase 1 POC Completion Checklist

After completing Issues 1–7, the POC supports:
- ✅ Create a real estate asset with persistence
- ✅ View list of all assets
- ✅ View asset details
- ✅ Edit an asset
- ✅ Delete an asset
- ✅ Create a maintenance request for an asset
- ✅ View maintenance requests per asset

**This is the demo milestone.** Gather user feedback before continuing.

---

## Phase 2 — Core Management Features (Issues 8–13)

**Goal**: Add rental unit management, tenant/lease basics, and a dashboard. Priorities may change based on POC feedback.

---

### Issue 8: RentalUnit Model and Add Screen

**Description**: Create the `RentalUnit` model and a form to add rental units within a `RealEstateAsset`. This enables per-unit tracking (apartments within a building, rooms in a house, etc.).

**Files to create/modify**:
- Create `src/models/RentalUnit.js`
- Create `src/services/RentalUnitStorageService.js`
- Create `src/screens/AddRentalUnitScreen.js`
- Modify `App.js` (add route)

**Acceptance criteria**:
- [ ] `RentalUnit` model includes: `unitId`, `assetId`, `unitName`, `unitType` (apartment | office | retail | room | other), `specifications` (areaSqMeters, bedrooms, bathrooms, floor), `occupancyStatus` (vacant | occupied | under_maintenance), `monthlyRent`, `notes`
- [ ] `RentalUnitStorageService` provides: `saveUnit(unit)`, `getUnitsByAssetId(assetId)`, `getUnitById(unitId)`, `updateUnit(unit)`, `deleteUnit(unitId)`
- [ ] `AddRentalUnitScreen` has form fields: unit name (required), unit type selector, specifications, monthly rent, notes
- [ ] Receives `assetId` via route params
- [ ] Unit tests for model and storage
- [ ] All existing tests still pass

---

### Issue 9: RentalUnit List on Asset Detail

**Description**: Show all rental units belonging to an asset on the `AssetDetailScreen`. Each unit displays its name, type, occupancy status, and monthly rent.

**Files to modify**:
- Modify `src/screens/AssetDetailScreen.js` (add rental unit list section)
- Modify `App.js` (add route for unit detail if needed)

**Acceptance criteria**:
- [ ] "Rental Units" section on `AssetDetailScreen`
- [ ] Each unit shows: name, type icon, occupancy status badge, monthly rent
- [ ] "Add Rental Unit" button navigates to `AddRentalUnitScreen`
- [ ] Summary (e.g., "4 units, 3 occupied, 1 vacant")
- [ ] Empty state message when no units exist
- [ ] Unit tests

---

### Issue 10: Tenant Model and Basic Management

**Description**: Create the `Tenant` model and basic add/view screens. Tenants are people who rent units.

**Files to create/modify**:
- Create `src/models/Tenant.js`
- Create `src/services/TenantStorageService.js`
- Create `src/screens/AddTenantScreen.js`
- Create `src/screens/TenantListScreen.js`
- Modify `App.js`

**Acceptance criteria**:
- [ ] `Tenant` model includes: `tenantId`, `firstName`, `lastName`, `email`, `phone`, `notes`
- [ ] `TenantStorageService` provides CRUD operations
- [ ] `AddTenantScreen` with form fields
- [ ] `TenantListScreen` shows all tenants
- [ ] Unit tests for model and storage

---

### Issue 11: LeaseAgreement Model and Creation

**Description**: Create the `LeaseAgreement` model linking a `Tenant` to a `RentalUnit` with lease terms.

**Files to create/modify**:
- Create `src/models/LeaseAgreement.js`
- Create `src/services/LeaseStorageService.js`
- Create `src/screens/AddLeaseScreen.js`
- Modify `App.js`

**Acceptance criteria**:
- [ ] `LeaseAgreement` model includes: `leaseId`, `unitId`, `tenantId`, `rentAmount`, `paymentFrequency` (monthly | weekly | biweekly), `depositAmount`, `startDate`, `endDate`, `leaseStatus` (active | expired | terminated), `notes`
- [ ] `LeaseStorageService` provides CRUD operations
- [ ] `AddLeaseScreen` with tenant picker, unit picker, and lease term fields
- [ ] Creating a lease updates `RentalUnit.occupancyStatus` to "occupied" and sets `activeLeaseId`
- [ ] Unit tests for model, storage, and status updates

---

### Issue 12: Update MaintenanceRequest Status

**Description**: Allow users to update the status and costs of existing maintenance requests (open → in_progress → completed). This completes the maintenance workflow.

**Files to create/modify**:
- Create `src/screens/MaintenanceRequestDetailScreen.js` (or modify expand behavior from Issue 7)
- Modify `App.js`

**Acceptance criteria**:
- [ ] View full maintenance request details
- [ ] Update status (open → in_progress → completed → cancelled)
- [ ] Update actual cost when completing
- [ ] Add completion date automatically when status set to "completed"
- [ ] Changes persist via `MaintenanceStorageService.updateRequest()`
- [ ] Unit tests

---

### Issue 13: Dashboard / Home Screen with Summary

**Description**: Replace or augment the welcome screen with a dashboard showing summary statistics: total assets, total units, open maintenance requests, occupancy rate.

**Files to create/modify**:
- Create `src/screens/DashboardScreen.js`
- Modify `App.js` (update initial route for returning users)
- Modify `src/components/GuestWelcome.js` (show dashboard when assets exist, welcome when none)

**Acceptance criteria**:
- [ ] Shows total assets count
- [ ] Shows total rental units and occupancy rate
- [ ] Shows open maintenance requests count
- [ ] Quick-action buttons: Add Asset, View All Assets, View Maintenance
- [ ] If no assets exist, show the `GuestWelcome` component instead
- [ ] Unit tests

---

## Phase 3 — Financial & Advanced Features (Issues 14–19)

**Goal**: Add financial tracking, search, and vendor management. These priorities should be validated by user feedback from the POC.

---

### Issue 14: RentCharge and Invoice Models

**Description**: Create models for tracking rent charges and generating invoices for tenants.

**Acceptance criteria**:
- [ ] `RentCharge` model: `chargeId`, `leaseId`, `unitId`, `amount`, `dueDate`, `chargeStatus` (pending | paid | overdue)
- [ ] `Invoice` model: `invoiceId`, `tenantId`, `charges[]`, `totalAmount`, `issueDate`, `dueDate`, `invoiceStatus`
- [ ] Storage services for both models
- [ ] Unit tests

---

### Issue 15: Payment Tracking

**Description**: Create `Payment` model and screens to record payments from tenants against invoices.

**Acceptance criteria**:
- [ ] `Payment` model: `paymentId`, `invoiceId`, `tenantId`, `amount`, `paymentDate`, `paymentMethod`, `notes`
- [ ] Record payment screen
- [ ] Payment history per tenant
- [ ] Auto-update invoice/charge status on payment
- [ ] Unit tests

---

### Issue 16: Financial Summary Views

**Description**: Create screens showing income summaries, outstanding balances, and expense reports from maintenance costs.

**Acceptance criteria**:
- [ ] Monthly income summary (total rent collected)
- [ ] Outstanding rent balances
- [ ] Maintenance expense totals
- [ ] Net income calculation (rent collected - maintenance costs)
- [ ] Unit tests

---

### Issue 17: Search and Filter Assets

**Description**: Add search and filter capabilities to the asset list screen.

**Acceptance criteria**:
- [ ] Search bar on `AssetListScreen` (filters by name, city)
- [ ] Filter by asset type
- [ ] Filter by occupancy status (if units exist)
- [ ] Results update in real-time as user types
- [ ] Unit tests

---

### Issue 18: WorkOrder Management

**Description**: Create `WorkOrder` model linked to `MaintenanceRequest` for tracking actual maintenance work execution.

**Acceptance criteria**:
- [ ] `WorkOrder` model: `workOrderId`, `requestId`, `serviceProviderId`, `scheduledDate`, `completedDate`, `cost`, `workOrderStatus`, `notes`
- [ ] Create and update work orders
- [ ] Link to maintenance requests
- [ ] Unit tests

---

### Issue 19: ServiceProvider Directory

**Description**: Create `ServiceProvider` model and a directory for managing vendors/contractors.

**Acceptance criteria**:
- [ ] `ServiceProvider` model: `providerId`, `name`, `specialty`, `phone`, `email`, `rating`, `notes`
- [ ] Add/edit/list service providers
- [ ] Select provider when creating work orders
- [ ] Unit tests

---

## Execution Notes for Agents

1. **Work issues in order** within each phase. Issues within a phase may have dependencies on earlier issues in the same phase.
2. **Follow domain naming** from `docs/agents/AGENTS_DOMAIN.md` — never use "Property" as an entity name.
3. **Follow coding standards** from `.github/copilot-instructions.md` — functional components, StyleSheet, PascalCase files.
4. **Write tests** for every new model and storage service. Component tests should verify rendering.
5. **Do not break existing tests** — all 9+ existing tests must continue to pass after every issue.
6. **Use scoped identifiers** — `assetId`, `unitId`, `requestId`, `leaseId`, never `id`.
7. **Storage services** should follow the pattern established in Issue 1 (`AssetStorageService`).
8. **Phase 1 (Issues 1–7) is the POC.** Stop after Phase 1 for user feedback before starting Phase 2.
9. **Update this file** after every status change. When you start working on an issue, change its status in the "Current Issue Status Summary" table and in the issue heading. When you open a PR, update again. When the PR is merged, update again. This keeps all agents and humans in sync.
