import React from 'react'
import Header from './components/Header'
import Manager from './components/Manager'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/login'

const App = () => {
  return (
    <Router>
    {/* <div>
      <Header/>
    </div> */}
    <Routes>
      
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/> 
      <Route path='/home' element={<Manager/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
   </Routes>
    </Router>
  )
}

export default App