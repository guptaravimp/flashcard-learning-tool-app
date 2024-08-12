import React, { useState, useEffect } from 'react';
import FlashCardList from '../components/FlashCardList';
import axios from 'axios';
const Home = () => {
  const [cards,setCards] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/flashcards')
      .then(response => setCards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);
 

  return (
    <div className='maincontainer'>
      <h1>Flashcard Learning Tool!</h1>
      <FlashCardList flashcards={cards}/>
     
    </div>
  );
};

  
export default Home;
