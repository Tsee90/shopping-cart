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

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d+$/.test(value)) {
      const number = Number(value);
      if (number < 100 && number > 0) {
        setQuantity(number);
      } else if (number > 99) {
        setQuantity(99);
      } else if (number < 1) {
        setQuantity(1);
      }
    }
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
            handleInputChange(e);
          }}
          onClick={(e) => {
            e.target.select();
          }}
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
