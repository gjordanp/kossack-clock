
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CountDown from './CountDown';
import { useState } from 'react';

function Tabata() {
    const navigate = useNavigate();
    const [round, setRound] = useState(0);
    const [work, setWork] = useState(0);
    const [rest, setRest] = useState(0);

    if (round > 0 && work > 0 && rest > 0) {
        return <CountDown name="TABATA" round={round} work={work} rest={rest} />
    }
    return (
        <>
            <h1>TABATA</h1>
            <form action=""  onSubmit={() => {
                //get form object values
                const form = document.querySelector('form')
                setRound(form.round.value)
                setWork(form.work.value)
                setRest(form.rest.value)
                // navigate('/countdown')
            }}>
                <div>
                    <label>FOR</label>
                    <input type="number" defaultValue='8' name='round' onClick={(e) => {e.target.select()}} />
                    <label>ROUND</label>
                </div>
                <br />
                <div>
                    <label>WORK</label>
                    <input type="number" defaultValue='15' name='work' onClick={(e) => {e.target.select()}} />
                    <label>SECONDS</label>
                </div>
                <br />
                <div>
                    <label>REST</label>
                    <input type="number" defaultValue='30' name='rest' onClick={(e) => {e.target.select()}} />
                    <label>SECONDS</label>
                </div>

                <br />
                <input type="submit" value='Start' />
            </form>
            <img className='bottom-right' src="/k-logo.png" alt=""/>
        </>
    )

}

export default Tabata