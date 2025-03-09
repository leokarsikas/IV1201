import { describe, it, expect } from 'vitest';
import { API_URL } from '../services/apiConfig';

describe('API_URL in apiConfig.ts', () => {
  it('should match the expected URL', () => {
    expect(API_URL).toBe('https://leosjobbland-backend-esf2dpg5atgpg5fy.swedencentral-01.azurewebsites.net/api');
  });
});