import React, { useState } from 'react';
import FlashcardForm from './FlashcardForm';

const Dashboard = ({ flashcards, onAdd, onEdit, onDelete }) => {
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);

  const handleSave = async (flashcard) => {
    if (flashcard.id) {
      await onEdit(flashcard); 
    } else {
      await onAdd(flashcard); 
    }
    setSelectedFlashcard(null); 
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
        <FlashcardForm 
          flashcard={selectedFlashcard} 
          onSave={handleSave} 
        />
      <div className='questionlist'>
        <h2>Question List !</h2>
         <div className='listedbox'>
         <ul >
             {flashcards.map((fc) => (
          <li key={fc.id} id='list'>
            <span>{fc.question}</span>
           <div className='btn-operation'>
           <button class="btn btn-success" onClick={() => setSelectedFlashcard(fc)}>Edit</button>
           <button class="btn btn-danger" onClick={() => onDelete(fc.question)}>Delete</button>

           </div>
           

           
          </li>
        ))}
      </ul>


         </div>
          
   
      
      </div>
     
  </div> 
  );
};

export default Dashboard;
