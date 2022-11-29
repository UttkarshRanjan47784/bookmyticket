import React from 'react';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoviePage from '../pages/MoviePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AccountPage from '../pages/AccountPage';
import BookTicketsPage from '../pages/BookTicketsPage';


function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route exact path="/register" element={<RegisterPage />}></Route>
          <Route exact path="/home" element={<HomePage />}></Route>
          <Route exact path="/search" element={<SearchPage />}></Route>
          <Route exact path="/moviepage" element={<MoviePage />}></Route>
          <Route exact path="/account" element={<AccountPage />}></Route>
          <Route exact path="/booktickets" element={<BookTicketsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App