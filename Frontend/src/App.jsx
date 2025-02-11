import React from 'react'
import { Outlet } from "react-router-dom";
import {Header, Footer} from './Components/index.js'

function App() {
  return (
    <div className='w-full min-h-screen relative font-inter'>
      <Header/>
      <main className='w-full h-full'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default App