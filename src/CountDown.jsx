import React from 'react'
import { useState, useEffect } from 'react'
import useTimer from 'easytimer-react-hook';
import { Timer } from "easytimer.js";


function CountDown({ round, work, rest }) {
  const [rounds, setRounds] = useState(0);
  const [workRound, setWorkRound] = useState(true);
  const [timer, isTargetAchieved] = useTimer({
    precision: 'seconds',
    startValues: { seconds: 5 },
    target: { seconds: 0 },
    countdown: true
  });

  useEffect(() => {
    timer.start();
  }, []);

  timer.addEventListener('targetAchieved', () => {
    if (rounds > round) {
      timer.stop();
    }
    else if (rounds == 0) //si es el primer round no hacemos nada
    {
      timer.stop();
      setRounds(rounds + 1);
      setWorkRound(true);
      timer.start({ startValues: { seconds: work }, target: { seconds: 0 } })
      console.log('rounds: ' + rounds)
    }
    else if (workRound) {
      timer.stop();
      setWorkRound(false);
      timer.start({ startValues: { seconds: rest }, target: { seconds: 0 } })
      console.log('rounds: ' + rounds)
    }
    //si es numero impar empezamos el timer de descanso
    else {
      timer.stop();
      setWorkRound(true);
      setRounds(rounds + 1);
      timer.start({ startValues: { seconds: work }, target: { seconds: 0 } });
      console.log('rounds: ' + rounds)
    }
  })

  if (rounds > round) {
    return <h1>FINISHED</h1>
  }
  else if (rounds == 0) {
    return (
      <>
        <h1>GET READY</h1>
        <h1>{timer.getTimeValues().seconds}</h1>
      </>

    )
  }
  else if (workRound) {
    return (
      <>
        <h2>ROUND {rounds} OF {round}</h2>
        <h1>WORK</h1>
        <h1>{timer.getTimeValues().seconds}</h1>
      </>
    )
  }
  else if (!workRound) {
    return (
      <>
        <h2>ROUND {rounds} OF {round}</h2>
        <h1>REST</h1>
        <h1>{timer.getTimeValues().seconds}</h1>
      </>
    )
  }



}
export default CountDown