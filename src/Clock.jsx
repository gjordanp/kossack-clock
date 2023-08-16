import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

function Clock() {
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US',{hour12: false}))
    //refreshes the time every second
    setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US',{hour12: false}))
    })

    //delet last character of time string
    // const deleteChar = () => {}
  return (
    <>
      <div className='back'>
          <ArrowCircleLeftOutlinedIcon  fontSize='large' onClick={() => navigate('..')} />
          <h2>CLOCK</h2>
      </div>
      
        <h1 className='time'>{time}</h1>
        <img className='bottom-right' src="/k-logo.png" alt=""/>
    </>
  )
}

export default Clock