import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Cart from './Cart';
import { useOutletContext } from 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: vi.fn(), // Mock useOutletContext only
  };
});

describe('Cart component', () => {
  it('displays "Your cart is empty" when no items are in the cart', () => {
    useOutletContext.mockReturnValue({ items: [], removeItem: vi.fn() });

    render(
      <MemoryRouter initialEntries={['/cart']}>
        <Routes>
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('displays items correctly when items are in the cart', async () => {
    const mockItems = [
      { id: 1, title: 'Item 1', price: 10.99, quantity: 2 },
      { id: 2, title: 'Item 2', price: 5.49, quantity: 1 },
    ];
    const mockRemoveItem = vi.fn();

    useOutletContext.mockReturnValue({
      items: mockItems,
      removeItem: mockRemoveItem,
    });

    render(
      <MemoryRouter initialEntries={['/cart']}>
        <Routes>
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(
      screen.getByText('Item: Item 1, Price: $10.99, Quantity: 2')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Item: Item 2, Price: $5.49, Quantity: 1')
    ).toBeInTheDocument();
    expect(screen.getByText('Total: $27.47')).toBeInTheDocument();

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(mockRemoveItem).toHaveBeenCalledWith(1);
    });
  });
});
