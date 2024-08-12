import React, { useState, useEffect } from 'react';

const FlashcardForm = ({ flashcard, onSave }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [options, setOptions] = useState('');
  useEffect(() => {
    if (flashcard) {
      setQuestion(flashcard.question || '');
      setAnswer(flashcard.answer || '');
      const optionsArray = Array.isArray(flashcard.options) 
        ? flashcard.options.join(', ') 
        : JSON.parse(flashcard.options || '[]').join(', ');
      setOptions(optionsArray);
    } else {
      setQuestion('');
      setAnswer('');
      setOptions('');
    }
  }, [flashcard]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const optionsArray = options.split(',').map(option => option.trim());
    const optionsJson = JSON.stringify(optionsArray);

    const flashcardData = {
      question,
      answer,
      options: optionsJson,
      ...(flashcard ? { id: flashcard.id } : {})
    };

    onSave(flashcardData); 
  };

  return (
    <div className='questionadd'>

<form onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question"
        required
      />
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Answer"
        required
      />
      <input
        type="text"
        value={options}
        onChange={(e) => setOptions(e.target.value)}
        placeholder="Options (comma separated)"
        required
      />
      <div className='addbutton'> <button id='border1' type="submit">Save</button></div>
    </form>

    </div>
    
  );
};

export default FlashcardForm;
