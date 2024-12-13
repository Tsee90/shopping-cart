import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Home from './components/Home';
import Cart from './components/Cart';

describe('App', () => {
  it('renders correct', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    expect(window.location.pathname).toBe('/home');
  });

  it('add button increases cart count', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    const link = screen.getByRole('link', { name: 'Home' });
    await user.click(link);
    const buttons = screen.getAllByRole('button', { name: 'Add' });
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
    const button = buttons[0];
    await user.click(button);
    expect(screen.getByText('Cart (1)')).toBeInTheDocument();
  });

  it('add button increases cart count', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: 'Cart (0)' });
    await user.click(link);
    expect(link).toBeInTheDocument();
    /* expect(screen.getByText('Your cart is empty.')).toBeInTheDocument(); */
  });
});
