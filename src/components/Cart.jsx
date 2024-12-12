import { useOutletContext } from 'react-router-dom';

function Cart() {
  const { items } = useOutletContext();
  return (
    <div>
      <div>This is going to becometh the cart</div>
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={index}>
            Item: {item.title}, Price: ${item.price}, Quantity: {item.quantity}
          </div>
        ))
      ) : (
        <div>Your cart is empty.</div>
      )}
    </div>
  );
}

export default Cart;
