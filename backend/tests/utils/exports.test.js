import { describe, it, expect } from 'vitest';
import * as Utils from '../../src/utils/index.js';

describe('Utils Index Exports', () => {
  it('should export all expected utilities', () => {
    expect(Utils.successFormatter).toBeDefined();
    expect(Utils.errorFormatter).toBeDefined();
    expect(Utils.loggerService).toBeDefined();
    expect(Utils.BaseError).toBeDefined();
    expect(Utils.paginate).toBeDefined();
    expect(Utils.UserRole).toBeDefined();
  });
});
