import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RegisterForm from '../app/components/RegisterForm';

vi.mock('@/app/lib/actions', () => ({
  register: vi.fn(),
}));

describe('RegisterForm', () => {
  it('renders Create Account heading', () => {
    render(<RegisterForm />);
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  it('renders name, email and password inputs', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders Sign Up button', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });
});
