
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CountDown from './CountDown';
import { useState } from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

function Emom() {
    const navigate = useNavigate();
    const [round, setRound] = useState(0);
    const [work, setWork] = useState(0);
    const [rest, setRest] = useState(0);

    if (round > 0 && work > 0 && rest >= 0) {
        return <CountDown name="EMOM" round={round} work={work} rest={rest} />
    }
    return (
        <>
            <ArrowCircleLeftOutlinedIcon className='back' fontSize='large' onClick={() => navigate('..')} />
            <h1>EMOM</h1>
            <form action=""  onSubmit={() => {
                //get form object values
                const form = document.querySelector('form')
                setRound(form.round.value)
                setWork(parseInt(form.seconds.value) + parseInt(form.minutes.value*60))
                setRest(form.rest.value)
            }}>
                <div>
                    <label>EVERY</label>
                    <input type="number" defaultValue='1' name='minutes' onClick={(e) => {e.target.select()}} />
                    <label>MINUTES</label>
                </div>
                <br />                
                <div>
                    <label>AND</label>
                    <input type="number" defaultValue='0' name='seconds' onClick={(e) => {e.target.select()}} />
                    <label>SECONDS</label>
                </div>
                <br />
                <div>
                    <label>FOR</label>
                    <input type="number" defaultValue='10' name='round' onClick={(e) => {e.target.select()}} />
                    <label>ROUND</label>
                </div>
                <br />
                <div>
                    <label>REST</label>
                    <input type="number" defaultValue='0' name='rest' onClick={(e) => {e.target.select()}} />
                    <label>SECONDS</label>
                </div>

                <br />
                <input type="submit" value='Start' />
            </form>
            <img className='bottom-right' src="/k-logo.png" alt=""/>
        </>
    )

}

export default Emom