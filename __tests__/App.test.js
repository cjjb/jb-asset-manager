/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import GuestWelcome from '../src/components/GuestWelcome';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders App correctly', () => {
  renderer.create(<App />);
});

it('renders GuestWelcome correctly', () => {
  renderer.create(<GuestWelcome />);
});
