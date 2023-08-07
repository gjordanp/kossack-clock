import React from 'react'
import { redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import viteLogo from '/vite.svg'

function Home() {
    const navigate = useNavigate();
    return (
        <>
            
            <h1>KOSSACK SC</h1>
            <div id='vert-div'>
            <button onClick={()=>navigate('/clock')}>CLOCK</button>
            <button onClick={()=>navigate('/tabata')}>TABATA</button>
            <button onClick={()=>navigate('/fortime')}>FOR TIME</button>
            <button>EMOM</button>
            <button>AMRAP</button>
            </div>
        </>
    )
}

export default Home