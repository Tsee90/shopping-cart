import { useOutletContext } from 'react-router-dom';
import Card from './Card.jsx';
import styles from './Home.module.css';
function Home() {
  const { addCart } = useOutletContext();
  const itemIds = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <div className={styles.container}>
        {itemIds.map((id) => {
          return <Card key={id} id={id} onClick={addCart}></Card>;
        })}
      </div>
    </div>
  );
}

export default Home;
