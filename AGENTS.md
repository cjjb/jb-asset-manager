# Agent Development Guide

This document provides essential guidelines for AI agents, GitHub Copilot, and developers working on the JB Asset Manager project. It summarizes the most critical practices and references detailed documentation.

---

## Quick Reference

- **Technology Guidelines**: See [.github/copilot-instructions.md](.github/copilot-instructions.md)
- **Domain Modeling Standards**: See [docs/agents/AGENTS_DOMAIN.md](docs/agents/AGENTS_DOMAIN.md)

---

## Project Overview

JB Asset Manager is a **React Native mobile application** for property management, built to help owners and managers:

- Manage rental properties and locations
- Track maintenance schedules (scheduled and non-scheduled)
- Monitor costs and income
- Provide guest welcome interfaces

**Key Technologies**: React Native 0.73.2, React Navigation v7, Jest, JavaScript (ES6+)

---

## Critical Domain Rules

### ⚠️ NEVER Use the Word "Property"

The term **property** is ambiguous for agents:

- In software → object attributes/properties
- In real estate → rental properties/land

**✅ ALWAYS use these terms instead:**

- `RealEstateAsset` - for owned real-estate assets
- `RentalUnit` - for individual rentable spaces
- `Building` - for physical structures containing units
- `Parcel` - for land without buildings

**When to Reference**: Consult [docs/agents/AGENTS_DOMAIN.md](docs/agents/AGENTS_DOMAIN.md) for:
- Complete domain model and entity definitions
- Naming standards for identifiers and attributes
- Financial, leasing, and maintenance entities
- JSON schema examples

---

## Code Standards

### Component Structure

```javascript
/**
 * ComponentName - Brief Description
 */
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const ComponentName = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Content */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default ComponentName;
```

### Naming Conventions

- **Components**: PascalCase (`GuestWelcome`, `AddLocationScreen`)
- **Files**: Match component name (`GuestWelcome.js`)
- **Screens**: Use `Screen` suffix (`AddLocationScreen`)
- **Styles**: camelCase (`container`, `primaryButton`)
- **Domain IDs**: Scoped identifiers (`unitId`, `assetId`, `leaseId`)

### Project Structure

```
src/
├── components/    # Reusable UI components
├── models/        # Data models and business logic
└── screens/       # Full-screen components
```

**When to Reference**: Consult [.github/copilot-instructions.md](.github/copilot-instructions.md) for:
- Complete coding standards and patterns
- Navigation and routing guidelines
- Testing setup and practices
- Common component templates
- Styling conventions and color palette

---

## Key Practices

### 1. Use React Native, Not Web React

❌ **Don't use**: HTML elements (`<div>`, `<span>`, CSS)  
✅ **Do use**: React Native components (`View`, `Text`, `StyleSheet`)

### 2. Domain-First Thinking

When implementing features:
- Use explicit entity names from the domain model
- Avoid programming-concept terminology for business entities
- Consider real-world rental property workflows

### 3. Styling Guidelines

- Use `StyleSheet.create()` for all styles
- Define styles at the end of the file
- Common colors:
  - Primary blue: `#3498db`
  - Dark text: `#2c3e50`
  - Light text: `#7f8c8d`

### 4. Navigation

- Use React Navigation (not React Router)
- Access via props: `({navigation}) => {}`
- Navigate with: `navigation.navigate('ScreenName')`

---

## Development Workflow

### Setup
```bash
npm install
cd ios && pod install && cd ..  # iOS only
```

### Running
```bash
npm start          # Start Metro
npm run ios        # Run on iOS
npm run android    # Run on Android
npm test          # Run tests
```

### Testing
- Tests in `__tests__/` directory
- Jest with React Native preset
- Mock native modules in `jest.setup.js`

---

## Agent Decision Tree

### "I need to understand the domain model"
→ Read [docs/agents/AGENTS_DOMAIN.md](docs/agents/AGENTS_DOMAIN.md)

### "I need to write React Native code"
→ Read [.github/copilot-instructions.md](.github/copilot-instructions.md)

### "I need to name a real-estate entity"
→ Check [docs/agents/AGENTS_DOMAIN.md](docs/agents/AGENTS_DOMAIN.md) section 2 (Core Domain Model)

### "I need a component template"
→ Check [.github/copilot-instructions.md](.github/copilot-instructions.md) section on Common Patterns

### "I'm confused about entity naming"
→ Remember: If it could be confused with a programming concept, it's invalid

---

## Golden Rules

1. **Never** use `Property` as an entity name
2. **Always** use explicit domain names (`RentalUnit` over `Unit` when ambiguity exists)
3. **Always** use functional components with hooks
4. **Always** use StyleSheet for styling
5. **Always** scope identifiers (`unitId`, not `id`)
6. **Never** use HTML elements or CSS
7. **Always** consider the property management context

---

## Summary

This guide provides a quick reference for the most important practices. For detailed information:

- **For React Native development, coding standards, and technical patterns**: See [.github/copilot-instructions.md](.github/copilot-instructions.md)
- **For domain modeling, entity naming, and business logic**: See [docs/agents/AGENTS_DOMAIN.md](docs/agents/AGENTS_DOMAIN.md)

When in doubt, prioritize domain clarity over code brevity, and always use explicit, unambiguous names.
