import { useOutletContext } from 'react-router-dom';
import Card from './Card.jsx';

function Home() {
  const { addCart } = useOutletContext();
  return (
    <div>
      <div>This is going to becometh the homepageth</div>
      <Card id={2} onClick={addCart}></Card>
    </div>
  );
}

export default Home;
