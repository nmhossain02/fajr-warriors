import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Leaderboard from './components/Leaderboard'
import HomePage from './components/HomePage'
import Admin from './components/Admin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Admin />
      <HomePage />
      <Leaderboard />
    </>
  )
}

export default App
