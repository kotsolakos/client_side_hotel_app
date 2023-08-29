import Card from '../Card/card.component';
import './card-list.styles.scss';

const CardList = ({ prop }) => {
  const { filteredRooms, option } = prop;
  if (filteredRooms){
    return (<div className='card-list'>
    {filteredRooms.map((room) => {
      return <Card key={room.id} room={room} option = {option} />;
    })}
    </div>);
  }  
};

export default CardList;