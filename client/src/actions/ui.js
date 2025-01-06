import {
  NAVIGATE_TO,
} from '../utils/constants';

export const navigateTo = (route) => {
  return { type: NAVIGATE_TO, data: route };
};
