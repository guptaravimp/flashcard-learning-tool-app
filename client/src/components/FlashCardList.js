import React, { useState } from 'react';
import './FlashCardList.css';

import FlashCard from "./FlashCard.js"
const FlashCardList=({flashcards})=>{
  const [index, setIndex] = useState(0);
  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };
  return(
    <div className="card-grid ">
    

    <FlashCard flashcard={flashcards[index]} />
    <div className='button1'><button id='border1'  onClick={handlePrevious}>Previous</button>
    <button id='border1' onClick={handleNext}>Next</button></div>
    
  </div>
    
  )
}
export default FlashCardList
