import Nav from './components/Nav';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  const addCart = (num) => {
    const newNum = cartCount + num;
    setCartCount(newNum);
  };

  return (
    <div>
      <Nav cartCount={cartCount} />
      <Outlet context={{ addCart }}></Outlet>
    </div>
  );
};

export default App;
