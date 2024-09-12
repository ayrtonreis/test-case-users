import { calculateAge } from './utils';

const DATE_REF = new Date('2024-09-12');

describe('utils', () => {
  test('should calculate correct ages', () => {
    expect(calculateAge('September 12, 2024', DATE_REF)).toBe(0);
    expect(calculateAge('September 20, 2023', DATE_REF)).toBe(0);
    expect(calculateAge('September 11, 2023', DATE_REF)).toBe(1);
    expect(calculateAge('January, 1994', DATE_REF)).toBe(30);
  });
});
