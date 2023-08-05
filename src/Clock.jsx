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
        <h1>CLOCK</h1>
        <h1>{time}</h1>
    </>
  )
}

export default Clock