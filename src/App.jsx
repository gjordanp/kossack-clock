import './App.css'
import {Routes, Route} from 'react-router-dom'
import Tabata from './Tabata'
import Fortime from './Fortime'
import Home from './Home'
import Clock from './Clock'
import Emom from './Emom'
import Amrap from './Amrap'
import { inject } from '@vercel/analytics';
 


function App() {
  inject();
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/clock' element={<Clock/>}/>
        <Route path='/tabata' element={<Tabata/>}/>
        <Route path='/fortime' element={<Fortime/>}/>
        <Route path='/emom' element={<Emom/>}/>
        <Route path='/amrap' element={<Amrap/>}/>
      </Routes>
    </>
  )
}

export default App
