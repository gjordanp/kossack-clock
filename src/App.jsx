import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Tabata from './Tabata'
import Home from './Home'
import Clock from './Clock'
import CountDown from './CountDown'

function App() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  //refreshes the time every second
  setInterval(() => {
    setTime(new Date().toLocaleTimeString())
  })

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>KOSSACK SC</h1>
      <div className="clock">
        <h1>Time</h1>
        <h2>{time}</h2>
      </div>
      <button onClick={() => setCount(count + 1)}>CLOCK</button>
      <button onClick={() => setCount(count + 1)}>TABATA</button>
      <button onClick={() => setCount(count + 1)}>STOPWATCH</button> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/clock' element={<Clock/>}/>
        <Route path='/countdown' element={<CountDown/>}/>
        <Route path='/tabata' element={<Tabata/>}/>
        <Route path='/stopwatch' element={<div>STOPWATCH</div>}/>
      </Routes>
      
    </>
  )
}

export default App
