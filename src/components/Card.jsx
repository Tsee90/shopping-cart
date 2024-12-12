import { useEffect, useState } from 'react';
import styles from './Card.module.css';

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
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default Card;
