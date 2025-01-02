import React ,{ useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Country from "./Country";

function App() {

  return (
    <Router basename="/REST-Countries-API">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/country/:name' element={<Country />} />
      </Routes>
    </Router>
  )
}

export default App
