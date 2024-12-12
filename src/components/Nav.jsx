import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = ({ cartCount = 0 }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>Fake Store LOL</li>
        <li>
          <Link to="cart">Cart ({cartCount})</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
