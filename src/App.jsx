import './App.css'
import {Routes, Route} from 'react-router-dom'
import Tabata from './Tabata'
import Fortime from './Fortime'
import Home from './Home'
import Clock from './Clock'
import CountDown from './CountDown'
import CountUp from './CountUp'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/clock' element={<Clock/>}/>
        <Route path='/tabata' element={<Tabata/>}/>
        <Route path='/fortime' element={<Fortime/>}/>
      </Routes>
    </>
  )
}

export default App
