import Nav from './components/Nav';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  const addCart = (item) => {
    const { quantity } = item;
    const newCount = cartCount + quantity;
    setCartCount(newCount);
    const newItem = { ...item, id: crypto.randomUUID() };
    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const removeItem = (id) => {
    const item = items.find((item) => item.id === id);
    const newCount = cartCount - item.quantity;
    setCartCount(newCount);
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div>
      <Nav cartCount={cartCount} />
      <Outlet context={{ addCart, items, removeItem }}></Outlet>
    </div>
  );
};

export default App;
