import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import "bootstrap/dist/css/bootstrap.min.css";
// import FlashCardList from './components/FlashCardList';
// import { useState } from 'react';
// function App() {
//   const [cards,setCards]= useState (SAMPLE_CARDS)
//   return (
//     <Router>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/admin" element={<Admin />} />
//     </Routes>
//   </Router>
     
     
//   );
// }
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
