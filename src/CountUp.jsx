import React from 'react'
import { useState, useEffect } from 'react'
import useTimer from 'easytimer-react-hook';
import { Timer } from "easytimer.js";
import * as Tone from 'tone'


function CountUp({ time }) {
  const [rounds, setRounds] = useState(0);
  const [timer, isTargetAchieved] = useTimer({
    precision: 'seconds',
    startValues: { seconds: 5 },
    target: { seconds: 0 },
    countdown: true,
  });

  useEffect(() => {
    timer.start();

    timer.addEventListener('secondsUpdated', () => {
      if(rounds == 0)
      {
        if (timer.getTimeValues().seconds == 3) {
          new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.3");
        }
        else if (timer.getTimeValues().seconds == 2) {
          new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.3");
        }
        else if (timer.getTimeValues().seconds == 1) {
          new Tone.Oscillator(900, "triangle").toDestination().start().stop("+0.5");
        }
      }
      else if(rounds == 1)
      {
        if (timer.getTimeValues().seconds == time*60-3) {
          new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.3");
        }
        else if (timer.getTimeValues().seconds == time*60-2) {
          new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.3");
        }
        else if (timer.getTimeValues().seconds == time*60-1) {
          new Tone.Oscillator(900, "triangle").toDestination().start().stop("+0.5");
        }
      }
  
    })
  }, []);

useEffect(() => {
  timer.addEventListener('targetAchieved', () => {
    if (rounds > 0) {
      timer.stop();
    }
    else if (rounds == 0) //si es el primer round no hacemos nada
    {
      setRounds(rounds + 1);
      timer.start({ startValues: { seconds: 0 }, target: { seconds: time*60 }, countdown: false })
    }
    else //si es el segundo round
    {
      setRounds(rounds + 1);
      timer.start({ startValues: { seconds: 0 }, target: { seconds: time*60 }, countdown: false })
    }
  })
}, [rounds])


  if (rounds > 1) {
    return <h1>FINISHED</h1>
  }
  else if (rounds == 0) {
    return (
      <>
        <h2 className='top-left'>FOR TIME</h2>
        <h1>GET READY</h1>
        <h1 className='time'>{timer.getTimeValues().seconds}</h1>
      </>

    )
  }
  else {
    return (
      <>
        <h2 className='top-left'>FOR TIME</h2>
        <h1 className='time'>{timer.getTimeValues().toString(['minutes', 'seconds'])}</h1>
      </>
    )
  }

}
export default CountUp