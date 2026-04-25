import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CategoryFilter from '../app/components/CategoryFilter';
import { Category } from '../app/lib/types';

const mockReplace = vi.fn();
const mockPathname = '/cars';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => mockPathname,
}));

describe('CategoryFilter', () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it('renders all category buttons', () => {
    render(<CategoryFilter />);
    Object.values(Category).forEach((cat: string) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  it('calls router.replace when a category is clicked', () => {
    render(<CategoryFilter />);
    fireEvent.click(screen.getByText(Category.SEDAN));
    expect(mockReplace).toHaveBeenCalledOnce();
    expect(mockReplace).toHaveBeenCalledWith(
      expect.stringContaining('category=SEDAN')
    );
  });

  it('highlights the active category', () => {
    render(<CategoryFilter activeCategory={Category.SUV} />);
    const btn = screen.getByText(Category.SUV) as HTMLElement;
    expect(btn.className).toContain('bg-accent');
  });
});
