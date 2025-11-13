import { 
  formatCurrency, 
  formatDate, 
  debounce, 
  isValidEmail, 
  isValidPhone, 
  sanitizeInput, 
  truncateText, 
  generateSlug, 
  getInitials, 
  sleep,
  isEmpty,
  groupBy
} from '@/lib/utils';

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('should format currency in Russian format', () => {
      expect(formatCurrency(1000)).toBe('1 000 ₽');
      expect(formatCurrency(1234567)).toBe('1 234 567 ₽');
    });
  });

  describe('formatDate', () => {
    it('should format date in Russian format', () => {
      const date = new Date('2023-01-15');
      expect(formatDate(date)).toMatch(/15.*января.*2023/);
    });
  });

  describe('isValidEmail', () => {
    it('should validate email format correctly', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate Russian phone number format', () => {
      expect(isValidPhone('+79123456789')).toBe(true);
      expect(isValidPhone('89123456789')).toBe(true);
      expect(isValidPhone('79123456789')).toBe(false); // Missing +
      expect(isValidPhone('invalid-phone')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize potentially dangerous characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
      expect(sanitizeInput('normal text')).toBe('normal text');
    });
  });

  describe('truncateText', () => {
    it('should truncate text to specified length', () => {
      expect(truncateText('This is a long text', 10)).toBe('This is...');
      expect(truncateText('Short', 10)).toBe('Short');
    });
  });

  describe('generateSlug', () => {
    it('should generate slug from string', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
      expect(generateSlug('Product & Category!')).toBe('product-category');
    });
  });

  describe('getInitials', () => {
    it('should get initials from full name', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Александр Пушкин')).toBe('АП');
      expect(getInitials('Single')).toBe('S');
      expect(getInitials('')).toBe('');
    });
  });

  describe('isEmpty', () => {
    it('should check if value is empty', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty('text')).toBe(false);
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
    });
  });

  describe('groupBy', () => {
    it('should group array items by key', () => {
      const items = [
        { id: 1, category: 'A' },
        { id: 2, category: 'B' },
        { id: 3, category: 'A' },
      ];
      
      const grouped = groupBy(items, 'category');
      expect(grouped['A']).toHaveLength(2);
      expect(grouped['B']).toHaveLength(1);
    });
  });

  describe('sleep', () => {
    it('should wait for specified time', async () => {
      const start = Date.now();
      await sleep(100);
      const end = Date.now();
      
      // Allow for some timing variation
      expect(end - start).toBeGreaterThanOrEqual(90);
    });
  });
});