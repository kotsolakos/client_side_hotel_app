import './card.styles.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context/user.context';

const Card = ({ room, option }) => {
  const { id, image, description, price } = room;
  const { user, setUser } = useContext(UserContext);
  const uint8Array = new Uint8Array(image.data);
  const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  const blobURL = URL.createObjectURL(blob);


  const onReserveSubmit = () => {
    const updatedReservedRooms = user.reserved_rooms + room.id + ",";
    setUser(prevUser => ({ ...prevUser, reserved_rooms: updatedReservedRooms }));
    fetch('http://localhost:3000/profile', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: user.id,
        reserved_rooms: updatedReservedRooms
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/roomsInsert', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userId:user.id,
            roomId:room.id,
            name: user.name
          })
        })
        .then(response => response.json())
        .catch(error => console.log('error in second fetch', error))
      }
    })
    .catch(error => console.log('error in first fetch', error));
  }

  const onCancelSubmit = () => {
    const elementToRemove = room.id + "";
    const arrayOfElements = user.reserved_rooms.split(',');
    const indexToRemove = arrayOfElements.indexOf(elementToRemove);
    
    if (indexToRemove !== -1) {
      arrayOfElements.splice(indexToRemove, 1);
      const updatedReservedRooms = arrayOfElements.join(',');
      setUser(prevUser => ({ ...prevUser, reserved_rooms: updatedReservedRooms }));
      fetch('http://localhost:3000/profile', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: user.id,
          reserved_rooms: updatedReservedRooms
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/roomsInsert', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              userId:"",
              roomId:room.id,
              name: ""
            })
          })
          .then(response => response.json())
          .catch(error => console.log('error in second fetch', error))
        }
      })
      .catch(error => console.log('error in first fetch', error));
    }
  }


  return (
    <div className='card-container'>
      <img src={blobURL} alt={`room ${id}`} />
      <p>{description}</p>
      <p>{price}</p>
      <div className="">
      {
        (option === "H")?
          <input
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="Reserve"
          onClick={onReserveSubmit}
          />
          :
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Cancel"
            onClick={onCancelSubmit}
          />
      }
      </div>
    </div>
  );
};

export default Card;