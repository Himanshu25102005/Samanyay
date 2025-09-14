import React from 'react'
import Login from './Pages/Login'
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
            {/* Public Routes(Can be accessed without logging in) */}
            <Route
              path='/'
              element={<Signup/>}
            />


            {/* Protected Routes(Only accessible when logged in ) */}

            <Route
            path='login'
            element={<Login/>}
            />

          </Routes>
    </Router>
  )
}

export default App