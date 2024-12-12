import App from '../App';
import Cart from './Cart';
import Home from './Home';

const routes = [
  {
    path: '/',
    element: <App></App>,
    children: [
      { path: 'home', element: <Home></Home> },
      { path: 'cart', element: <Cart></Cart> },
    ],
  },
];

export default routes;
