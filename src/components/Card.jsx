import { useEffect, useState } from 'react';
import styles from './Card.module.css';

function Card({ id, onClick }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [imgSrc, setImgSrc] = useState('');
  const [description, setDescription] = useState('');

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

  return (
    <div className={styles.cardContainer}>
      <div>{title}</div>
      <div>${price}</div>
      <img src={imgSrc} alt="" />
      <div>{description}</div>
      <div>
        <label>Quantity:</label>
        <input type="number" />
        <button onClick={onClick}>Add</button>
      </div>
    </div>
  );
}

export default Card;
