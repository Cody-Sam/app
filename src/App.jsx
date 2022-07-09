import { useState } from 'react'
import logo from './logo.svg'
import tw from 'twin.macro'
import "./index.css"

function App() {
  return (
    <div className="App bg-slate-900 h-screen" >
      <header className="App-header">
        <img src={logo} className="App-logo w-1/2" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
      </header>
    </div>
  )
}

export default App
