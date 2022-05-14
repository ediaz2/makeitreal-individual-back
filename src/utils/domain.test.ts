import { describe, expect, it } from 'vitest';

import { isSubdomainExists } from './domain';

const domain = 'example.com';

describe('domain', () => {
  it('should return true if domain is valid', () => {
    expect(isSubdomainExists(domain, 'test.example.com')).toBe(true);
    expect(isSubdomainExists(domain, 'test.example.com:8080')).toBe(true);
    expect(isSubdomainExists(domain, 'test1.example.com:4000')).toBe(true);
  });

  it('should return false if domain is invalid', () => {
    expect(isSubdomainExists(domain, 'example.com')).toBe(false);
    expect(isSubdomainExists(domain, 'example.com.jp')).toBe(false);
    expect(isSubdomainExists(domain, 'test.test.example.com:8080')).toBe(false);
  });
});
