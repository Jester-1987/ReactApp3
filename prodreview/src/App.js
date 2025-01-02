import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CreateReview from './components/CreateReview';
import Review from './components/Review';
import ReviewList from './components/ReviewList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<ReviewList />} />
          <Route path={"/create-review"} element={<CreateReview />} />
          <Route path={"/review/:id"} element={<Review />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


