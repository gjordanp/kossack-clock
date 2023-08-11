
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CountUp from './CountUp';
import { useState } from 'react';

function Fortime() {
    const navigate = useNavigate();
    const [time, setTime] = useState(0);

    if (time > 0) {
        return <CountUp time={time}/>
    }
    return (
        <>
            <h1>FOR TIME</h1>
            <form action=""  onSubmit={() => {
                //get form object values
                const form = document.querySelector('form')
                setTime(form.time.value)
            }}>
                <div>
                    <label>FOR</label>
                    <input type="number" defaultValue='2' name='time' onClick={(e) => {e.target.select()}} />
                    <label>MINUTES</label>
                </div>
                <br />
                <input type="submit" value='Start' />
            </form>
            <img className='bottom-right' src="/k-logo.png" alt=""/>
        </>
    )

}

export default Fortime