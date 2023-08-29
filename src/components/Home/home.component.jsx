import { useState, useEffect } from 'react';
import { Navigate  } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context/user.context';
import CardList from '../Card-List/card-list.component';


const Home = ({isSignedIn}) => {
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
    let reserved_rooms;
    let reserved_by_others = rooms.filter((currentVal) => {
      if (currentVal.reserved_by.split(",")[0] !== null && currentVal.reserved_by.split(",")[0] !== "" && currentVal.reserved_by.split(",")[0] != user.id){
        return currentVal;
      }
    });
    if (reserved_by_others){
      if(user.reserved_rooms){
        reserved_rooms = rooms.filter((currentVal) => {
          let count = 0;
          let count_by_others = 0;
          for(let i = 0; i < user.reserved_rooms.split(",").length - 1; i++){
            if(user.reserved_rooms.split(",")[i] == currentVal.id){
              count++;
            }
          }
          for(let j = 0; j < reserved_by_others.length; j++){
            if(reserved_by_others[j].id == currentVal.id){
              count_by_others++;
            }
          }
          if(count === 0 && count_by_others === 0){
            return currentVal;
          }
        });
        setFilteredRooms(reserved_rooms);
      }
      else {
        reserved_rooms = rooms.filter((currentVal) => {
          let count_by_others = 0;
          for(let j = 0; j < reserved_by_others.length; j++){
            if(reserved_by_others[j].id == currentVal.id){
              count_by_others++;
            }
          }
          if(count_by_others === 0){
            return currentVal;
          }
        });
        setFilteredRooms(reserved_rooms);
      } 
    }
    else if(user.reserved_rooms){
      reserved_rooms = rooms.filter((currentVal) => {
        let count = 0;
        for(let i = 0; i < user.reserved_rooms.split(",").length - 1; i++){
          if(user.reserved_rooms.split(",")[i] == currentVal.id){
            count++;
          }
        }
        if(count === 0){
          return currentVal;
        }
      });
      setFilteredRooms(reserved_rooms);
    }
    else {
      setFilteredRooms(rooms);
    } 
  }, [user, rooms]);

  const prop = {filteredRooms, option:"H"};

  return (
    isSignedIn?
      <div className='Home'>
        <CardList prop={prop} />
      </div>
      :<Navigate to="/" replace/>
  )
}

export default Home;

