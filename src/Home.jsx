import React from 'react'
import { redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import viteLogo from '/vite.svg'

function Home() {
    const navigate = useNavigate();
    return (
        <>
            {/* <img src="/kossack-logo.svg" alt=""/> */}
            <img src="/logo.png" alt=""/>
            {/* <h1>KOSSACK SC</h1> */}
            <div id='vert-div'>
            <button onClick={()=>navigate('/clock')}>CLOCK</button>
            <button onClick={()=>navigate('/tabata')}>TABATA</button>
            <button onClick={()=>navigate('/fortime')}>FOR TIME</button>
            <button onClick={()=>navigate('/emom')}>EMOM</button>
            <button onClick={()=>navigate('/amrap')}>AMRAP</button>
            </div>
        </>
    )
}

export default Home