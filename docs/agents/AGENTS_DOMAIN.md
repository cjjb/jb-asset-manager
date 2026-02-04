# Property Management Domain Guide for Agentic Development

This document defines **domain logic, entity naming standards, and modeling conventions** for a property management platform.

Its purpose is to ensure **agentic systems (GitHub agents, LLM-based code agents, copilots)** can reason unambiguously about the domain and **never confuse real-estate concepts with programming concepts** (e.g. object properties vs rental properties).

---

## 1. Design Principles (Non‑Negotiable)

### 1.1 Avoid the Word `Property`

The term **property** is ambiguous for agents:

* In software → object attributes
* In real estate → land, buildings, rentals

❌ Do NOT use `Property` as a primary domain entity.

✅ Use explicit real-estate nouns instead.

---

### 1.2 Explicit > Concise

Agents reason better with **explicit semantic names**, even if they are longer.

Prefer:

* `RealEstateAsset` over `Asset`
* `RentalUnit` over `Unit` (when ambiguity exists)
* `LeaseAgreement` over `Contract`

---

### 1.3 Domain First, Implementation Second

Entity names must describe **real-world meaning**, not storage or UI concerns.

---

## 2. Core Domain Model

### 2.1 Top-Level Aggregates

```text
Portfolio
 └── RealEstateAsset
      ├── Building
      │    └── RentalUnit
      └── Parcel
```

---

### 2.2 Core Entities

#### Portfolio

Represents a logical grouping of real-estate assets.

* `portfolioId`
* `name`
* `assets[]`

---

#### RealEstateAsset

A legally owned real-estate asset.

* `assetId`
* `assetType` (residential | commercial | mixed | land)
* `ownership`
* `location`

---

#### Building

A physical structure that contains rentable units.

* `buildingId`
* `assetId`
* `address`
* `floors`
* `units[]`

---

#### RentalUnit

The **primary rentable entity**.

* `unitId`
* `buildingId`
* `unitType` (apartment | office | retail)
* `specifications`
* `occupancyStatus`
* `activeLeaseId`

⚠️ Never name this entity `Property`.

---

#### Parcel

Land without a building.

* `parcelId`
* `assetId`
* `zoningType`
* `areaSqMeters`

---

## 3. People & Roles

### 3.1 Identity vs Responsibility

| Concept           | Entity         |
| ----------------- | -------------- |
| Legal owner       | `AssetOwner`   |
| Manager           | `AssetManager` |
| Tenant            | `Tenant`       |
| Physical occupant | `Occupant`     |
| Leasing agent     | `LeasingAgent` |

Agents must never infer responsibility from occupancy.

---

## 4. Leasing & Legal

### Lease

Represents a legally binding rental agreement.

* `leaseId`
* `unitId`
* `tenantId`
* `leaseTerms`
* `startDate`
* `endDate`
* `leaseStatus`

---

### LeaseAgreement

Structured terms of a lease.

* `rentAmount`
* `paymentFrequency`
* `depositAmount`
* `lateFeePolicy`

---

## 5. Financial Domain

| Concept      | Entity         |
| ------------ | -------------- |
| Rent         | `RentCharge`   |
| Invoice      | `Invoice`      |
| Payment      | `Payment`      |
| Owner payout | `Disbursement` |
| Fee          | `Fee`          |

Avoid generic terms like `Transaction` unless scoped.

---

## 6. Maintenance & Operations

| Concept    | Entity               |
| ---------- | -------------------- |
| Issue      | `MaintenanceRequest` |
| Execution  | `WorkOrder`          |
| Vendor     | `ServiceProvider`    |
| Inspection | `Inspection`         |

---

## 7. Attribute Naming Standards

### 7.1 Avoid Generic Containers

❌ `properties`
❌ `details`
❌ `info`

✅ Preferred replacements:

* `attributes`
* `specifications`
* `metadata`
* `records`

---

### 7.2 Identifier Naming

Always scope identifiers:

✅ `unitId`
✅ `assetId`
✅ `leaseId`

❌ `id`
❌ `propertyId`

---

## 8. Agent‑Safe JSON Example

```json
{
  "rentalUnit": {
    "unitId": "RU-123",
    "specifications": {
      "areaSqMeters": 85,
      "bedrooms": 2
    },
    "occupancyStatus": "occupied",
    "activeLeaseId": "LEASE-889"
  }
}
```

---

## 9. Language Rules for Agents

Agents MUST:

* Treat `RentalUnit` as the rentable entity
* Treat `RealEstateAsset` as ownership scope
* Never invent a `Property` entity
* Never overload the word `property`

---

## 10. Canonical Naming Rule (TL;DR for Agents)

> **If a name could be confused with a programming concept, it is invalid.**

---
