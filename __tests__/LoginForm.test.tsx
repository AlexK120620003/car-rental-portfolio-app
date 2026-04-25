import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import LoginForm from '../app/components/LoginForm';

vi.mock('@/app/lib/actions', () => ({
  login: vi.fn(),
}));

describe('LoginForm', () => {
  it('renders Welcome Back heading', () => {
    render(<LoginForm />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders Sign In button', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });
});
