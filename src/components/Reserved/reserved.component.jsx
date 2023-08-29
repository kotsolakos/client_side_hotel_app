import { useState, useEffect } from 'react';
import { Navigate  } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context/user.context';
import CardList from '../Card-List/card-list.component';


const Reserved = ({isSignedIn}) => {
  const { user } = useContext(UserContext);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  useEffect(() => {
    fetch('http://localhost:3000/rooms', {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(result => setRooms(result))
  }, []);
  

  useEffect(() => {
    let reserved_rooms = [];
    if(user.reserved_rooms){
      reserved_rooms = rooms.filter((currentVal) => {
        for(let i = 0; i < user.reserved_rooms.split(",").length; i++){
          if(user.reserved_rooms.split(",")[i] == currentVal.id){
            return currentVal;
          }
        }
      });
    }
    else {
      reserved_rooms = [];
    }
    setFilteredRooms(reserved_rooms);
  }, [user, rooms]);
  const prop = {filteredRooms, option:"R"};

  return (
    isSignedIn?
      <div className='Home'>
        <CardList prop={prop}/>
      </div>
      :<Navigate to="/" replace/>
  )
}

export default Reserved;

