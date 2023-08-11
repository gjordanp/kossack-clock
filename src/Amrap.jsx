
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CountDown from './CountDown';
import { useState } from 'react';

function Amrap() {
    const navigate = useNavigate();
    const [work, setWork] = useState(0);
    const [round, setRound] = useState(0);


    if (round > 0 && work > 0) {
        return <CountDown name="AMRAP" round={round} work={work} rest={0} />
    }
    return (
        <>
            <h1>AMRAP</h1>
            <form action=""  onSubmit={() => {
                //get form object values
                const form = document.querySelector('form');
                setWork(parseInt(form.minutes.value*60));
                setRound(1);
            }}>
                <div>
                    <label>FOR</label>
                    <input type="number" defaultValue='1' name='minutes' onClick={(e) => {e.target.select()}} />
                    <label>MINUTES</label>
                </div>
                <br />
                <input type="submit" value='Start' />
            </form>
        </>
    )

}

export default Amrap