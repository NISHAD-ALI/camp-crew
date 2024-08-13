import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import './index.css'
import LoginPage from './Pages/LoginPage';
import CampPage from './Pages/CampPage';
import Camp from './Pages/Camp';
import ProfilePage from './Pages/ProfilePage';
import Signup from './Pages/SignupPage';

function App() {


  return (
    <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/campList" element={<CampPage />} />
    <Route path='/camp/:id' element={<Camp />} />
    <Route path='/profile/:id' element={<ProfilePage />} />
    <Route path='/signUp' element={<Signup />} />
    {/* <Route path="/admin*" element={<AdminRoutes />} /> */}
    </Routes>
   </Router>
   
  )
}

export default App
