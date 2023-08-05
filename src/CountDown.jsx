import React from 'react'
import { useState, useEffect } from 'react'
import useTimer from 'easytimer-react-hook';
import { Timer } from "easytimer.js";


function CountDown({ round, work, rest }) {
  const [rounds, setRounds] = useState(0);
  const [workRound, setWorkRound] = useState(true);
  const [timer, isTargetAchieved] = useTimer({
    precision: 'seconds',
    startValues: { seconds: 10 },
    target: { seconds: 0 },
    countdown: true
  });

  useEffect(() => {
    timer.start();
  }, []);

  timer.addEventListener('targetAchieved', () => {
    if (rounds == round) {
      timer.stop();
      return;
    }
    else{
      if(rounds==0)
      {setRounds(rounds+1);}
      //si es numero par aumentamos el contador de rounds y empezamos el timer de trabajo
      // si rounds es par empezamos el timer de trabajo
      if (workRound) { 
        timer.start({ startValues: { seconds: work },target: { seconds: 0 } })
        setWorkRound(!workRound);
        console.log('rounds: ' + rounds)
      }
      //si es numero impar empezamos el timer de descanso
      else{
        timer.start({ startValues: { seconds: rest },target: { seconds: 0 } });
        setWorkRound(!workRound);
        setRounds(rounds + 1);
        console.log('rounds: ' + rounds)
      }
    }
  })

  if (rounds == 0) {
    return (
      <>
        <h1>COUNTDOWN</h1>
        <h1>{timer.getTimeValues().seconds}</h1>
      </>

    )
  }
  else if (rounds == round) {
    return <h1>FINISHED</h1>
  }
  else if (workRound) {
    return (
      <>
        <h1>WORK</h1>
        <h1>{timer.getTimeValues().seconds}</h1>
      </>
    )
  }
  else if (!workRound) {
    return (
      <>
        <h1>REST</h1>
        <h1>{timer.getTimeValues().seconds}</h1>
      </>
    )
  }



}
export default CountDown