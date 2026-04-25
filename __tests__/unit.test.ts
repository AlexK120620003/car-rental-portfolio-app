import {
  getDaysInMonth,
  calculateTotalDays,
  calculateTotalPrice,
} from '../app/lib/unit';

describe('getDaysInMonth', () => {
  it('returns 31 days for January 2025', () => {
    const days = getDaysInMonth(new Date(2025, 0)); // January
    const actual = days.filter(d => d !== null);
    expect(actual).toHaveLength(31);
  });

  it('returns 28 days for February 2025 (not leap year)', () => {
    const days = getDaysInMonth(new Date(2025, 1)); // February
    const actual = days.filter(d => d !== null);
    expect(actual).toHaveLength(28);
  });

  it('pads start with nulls so first day lands on correct weekday', () => {
    // January 2025 starts on Wednesday (day index 3)
    const days = getDaysInMonth(new Date(2025, 0));
    expect(days[0]).toBeNull();
    expect(days[3]).not.toBeNull();
    expect(days[3]!.getDate()).toBe(1);
  });
});

describe('calculateTotalDays', () => {
  it('returns 0 when dates are null', () => {
    expect(calculateTotalDays(null, null)).toBe(0);
  });

  it('calculates correct number of days', () => {
    const start = new Date(2025, 0, 1); // Jan 1
    const end = new Date(2025, 0, 6); // Jan 6
    expect(calculateTotalDays(start, end)).toBe(5);
  });
});

describe('calculateTotalPrice', () => {
  it('returns 0 when days is 0', () => {
    expect(calculateTotalPrice(0, 100)).toBe(0);
  });

  it('multiplies days by price correctly', () => {
    expect(calculateTotalPrice(5, 80)).toBe(400);
  });
});
