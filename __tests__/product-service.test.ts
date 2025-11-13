import { validatePaginationParams } from '@/lib/product-service';

describe('Product Service', () => {
  describe('validatePaginationParams', () => {
    it('should return valid pagination params with default values', () => {
      const result = validatePaginationParams(1, 10);
      expect(result).toEqual({
        page: 1,
        limit: 10,
        offset: 0
      });
    });

    it('should handle page less than 1', () => {
      const result = validatePaginationParams(-1, 10);
      expect(result).toEqual({
        page: 1, // Should be normalized to 1
        limit: 10,
        offset: 0
      });
    });

    it('should handle limit less than 1', () => {
      const result = validatePaginationParams(1, -5);
      expect(result).toEqual({
        page: 1,
        limit: 1, // Should be normalized to 1
        offset: 0
      });
    });

    it('should handle limit greater than 50', () => {
      const result = validatePaginationParams(1, 100);
      expect(result).toEqual({
        page: 1,
        limit: 50, // Should be normalized to 50
        offset: 0
      });
    });

    it('should calculate correct offset for page 2', () => {
      const result = validatePaginationParams(2, 10);
      expect(result).toEqual({
        page: 2,
        limit: 10,
        offset: 10 // (2-1) * 10 = 10
      });
    });

    it('should calculate correct offset for page 3', () => {
      const result = validatePaginationParams(3, 5);
      expect(result).toEqual({
        page: 3,
        limit: 5,
        offset: 10 // (3-1) * 5 = 10
      });
    });
  });
});