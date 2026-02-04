/**
 * @format
 */

import 'react-native';
import React from 'react';
import GuestWelcome from '../src/components/GuestWelcome';
import AddLocationScreen from '../src/screens/AddLocationScreen';

// Note: import explicitly to use the types shipped with jest.
import {it, describe} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('Components', () => {
  it('renders GuestWelcome correctly', () => {
    const tree = renderer.create(<GuestWelcome navigation={mockNavigation} />);
    expect(tree).toBeDefined();
  });

  it('renders AddLocationScreen correctly', () => {
    const tree = renderer.create(<AddLocationScreen navigation={mockNavigation} />);
    expect(tree).toBeDefined();
  });
});
