import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' index element={<Login />} />
          <Route path='/signup' index element={<SignUp />} />
          {/* <Route path='/home' index element={<Home/>} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
