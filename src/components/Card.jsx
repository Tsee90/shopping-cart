import { useEffect, useState } from 'react';
import styles from './Card.module.css';
import PropTypes from 'prop-types';

function Card({ id, onClick }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [imgSrc, setImgSrc] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        const title = response.title;
        setTitle(title);
        const price = response.price;
        setPrice(price);
        const src = response.image;
        setImgSrc(src);
        const description = response.description;
        setDescription(description);
      });
  }, [id]);

  const handleAdd = () => {
    const item = { title, price, imgSrc, description, quantity };
    onClick(item);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.price}>${price.toFixed(2)}</div>
      <img src={imgSrc} alt="" />
      <div>{description}</div>
      <div className={styles.quantity}>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => {
            if (e.target.value < 100 && e.target.value > 0) {
              setQuantity(Number(e.target.value));
            } else if (e.target.value < 1) {
              setQuantity(1);
            } else if (e.target.value > 99) {
              setQuantity(99);
            }
          }}
          min="1"
          max="99"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  onClick: PropTypes.func,
};

export default Card;
