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
    const newNum = cartCount + quantity;
    setCartCount(newNum);
    const newItems = [...items, item];
    setItems(newItems);
  };

  return (
    <div>
      <Nav cartCount={cartCount} />
      <Outlet context={{ addCart, items }}></Outlet>
    </div>
  );
};

export default App;
