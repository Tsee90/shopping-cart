import Nav from './components/Nav';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return (
    <div>
      <Nav />
      <Outlet></Outlet>
    </div>
  );
};

export default App;
