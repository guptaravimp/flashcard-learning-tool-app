import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../components/Dashboard';

const Admin = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/flashcards');
        setFlashcards(response.data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const addFlashcard = async (newCard) => {
    try {
      const response = await axios.post('http://localhost:5000/flashcards', newCard);
      setFlashcards([...flashcards, response.data]);
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const editFlashcard = async (updatedCard) => {
    try {
      const response = await axios.put(`http://localhost:5000/flashcards/${updatedCard.id}`, updatedCard);
      setFlashcards(flashcards.map(fc => fc.id === response.data.id ? response.data : fc));
    } catch (error) {
      console.error('Error editing flashcard:', error);
    }
  };
  
  const deleteFlashcard = async (question) => {
    try {
      console.log('Deleting flashcard with question:', question); 
      await axios.delete('http://localhost:5000/flashcards', {
        params: { question }
      });
      console.log('Flashcard deleted successfully'); 
      setFlashcards(flashcards.filter(fc => fc.question !== question));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };
  
  

  return (
    <Dashboard
      flashcards={flashcards}
      onAdd={addFlashcard}
      onEdit={editFlashcard}
      onDelete={deleteFlashcard}
    />
  );
};

export default Admin;
