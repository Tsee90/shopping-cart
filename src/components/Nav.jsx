import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import PropTypes from 'prop-types';

const Nav = ({ cartCount = 0 }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <div className={styles.title}>Fake Store</div>
        </li>
        <li>
          <Link to="cart">Cart ({cartCount})</Link>
        </li>
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  cartCount: PropTypes.number,
};

export default Nav;
