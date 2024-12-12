import { useOutletContext } from 'react-router-dom';
import styles from './Cart.module.css';

function Cart() {
  const { items, removeItem } = useOutletContext();
  const calculateTotalForAllItems = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const total = calculateTotalForAllItems(items);
  return (
    <div>
      <div className={styles.cart}>Your Cart</div>
      {items.length > 0 ? (
        <div className={styles.container}>
          {items.map((item, index) => (
            <div className={styles.item} key={index}>
              <div>
                Item: {item.title}, Price: ${item.price.toFixed(2)}, Quantity:{' '}
                {item.quantity}
              </div>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <div className={styles.total}>Total: ${total.toFixed(2)}</div>
          <button className={styles.buy}>Buy</button>
        </div>
      ) : (
        <div>Your cart is empty.</div>
      )}
    </div>
  );
}

export default Cart;
