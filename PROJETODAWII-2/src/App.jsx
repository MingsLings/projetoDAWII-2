import { useState } from 'react'
import { BrowserRouter, Router, Route, Link, Routes } from "react-router-dom"
import UserList from "./pages/UserList"
import UserCreate from "./pages/UserCreate"
import UserEdit from "./pages/UserEdit"
import "./styles/global.css"

function App() {
  return (
    <BrowserRouter>
      <nav className='navbar'>
        <Link to="/">Usuários</Link>
        <Link to="/create">Criar Usuários</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UserList/>}/>
        <Route path="/create" element={<UserCreate/>}/>
        <Route path="/edit/:id" element={<UserEdit/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
