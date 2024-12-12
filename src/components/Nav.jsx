import { Link } from 'react-router-dom';

const Nav = ({ cartCount = 0 }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="cart">Cart ({cartCount})</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
