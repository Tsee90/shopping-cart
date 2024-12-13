import { beforeAll, afterAll, describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';

describe('Card component', () => {
  beforeAll(() => {
    global.fetch = vi.fn();
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  it('renders fetched data correctly', async () => {
    const mockResponse = {
      title: 'Mock Product',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      description: 'This is a mock product.',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const mockOnClick = vi.fn();
    render(<Card id={1} onClick={mockOnClick} />);

    await waitFor(() => {
      expect(screen.getByText('Mock Product')).toBeInTheDocument();
    });

    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150'
    );
    expect(screen.getByText('This is a mock product.')).toBeInTheDocument();
  });

  it('calls onClick with the correct data when Add button is clicked', async () => {
    const mockResponse = {
      title: 'Mock Product',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      description: 'This is a mock product.',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const mockOnClick = vi.fn();
    render(<Card id={1} onClick={mockOnClick} />);

    await waitFor(() => {
      expect(screen.getByText('Mock Product')).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: 'Add' });
    await userEvent.click(addButton);

    expect(mockOnClick).toHaveBeenCalledWith({
      title: 'Mock Product',
      price: 19.99,
      imgSrc: 'https://via.placeholder.com/150',
      description: 'This is a mock product.',
      quantity: 1,
    });
  });

  it('updates quantity input and respects boundaries', async () => {
    const mockResponse = {
      title: 'Mock Product',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      description: 'This is a mock product.',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const mockOnClick = vi.fn();
    render(<Card id={1} onClick={mockOnClick} />);

    await waitFor(() => {
      expect(screen.getByText('Mock Product')).toBeInTheDocument();
    });

    const quantityInput = screen.getByLabelText('Quantity:');
    await userEvent.clear(quantityInput);
    await userEvent.type(quantityInput, '5');
    expect(quantityInput).toHaveValue(5);

    await userEvent.clear(quantityInput);
    await userEvent.type(quantityInput, '0');
    expect(quantityInput).toHaveValue(1);

    await userEvent.clear(quantityInput);
    await userEvent.type(quantityInput, '100');
    expect(quantityInput).toHaveValue(99);
  });
});
