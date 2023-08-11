import React from 'react'
import { useState } from 'react'

function Clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US',{hour12: false}))
    //refreshes the time every second
    setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US',{hour12: false}))
    })

    //delet last character of time string
    // const deleteChar = () => {}
  return (
    <>
        <h2 className='top-left'>CLOCK</h2>
        <h1 className='time'>{time}</h1>
        <img className='bottom-right' src="/k-logo.png" alt=""/>
    </>
  )
}

export default Clock