import React, { useState } from "react";
import './FlashCard.css'; 

const FlashCard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);

  if (!flashcard) {
    return <div>Loading...</div>; 
  }
  const options = Array.isArray(flashcard.options) ? flashcard.options : JSON.parse(flashcard.options || '[]');
  return (
    <div id="cardi"
      className={`card ${flip ? 'flip' : ''}`} 
      onClick={() => setFlip(!flip)}
    >
      <div className="front">
        <h2>{flashcard.question}</h2>
        <div className="flashcard-options">
        {options.map((option, index) => (
            <div key={index} className="flashcard-option">
              {index+1}- {option}
            </div>
          ))}
      
        </div>
      </div>
      <div className="back">
        <h3 >{flashcard.answer}</h3>
      </div>
    </div>
  );
};

export default FlashCard;
