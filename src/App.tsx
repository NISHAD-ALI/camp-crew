import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import './index.css'

function App() {


  return (
    <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />
    {/* <Route path="/admin*" element={<AdminRoutes />} /> */}
    </Routes>
   </Router>
  )
}

export default App
