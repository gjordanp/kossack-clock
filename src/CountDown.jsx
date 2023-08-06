import React from 'react'
import { useState, useEffect } from 'react'
import useTimer from 'easytimer-react-hook';
import { Timer } from "easytimer.js";
import * as Tone from 'tone'


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

  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.PolySynth().toDestination();

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

  timer.addEventListener('secondsUpdated', () => {
    if (timer.getTimeValues().seconds == 3) {
      synth.triggerAttackRelease('C5', '0.1');
    }
    else if (timer.getTimeValues().seconds == 2) {
      synth.triggerAttackRelease('C5', '0.1');
    }
    else if (timer.getTimeValues().seconds == 1) {
      synth.triggerAttackRelease('E5', '0.4');
    }
  })

  if (rounds > round) {
    return <h1>FINISHED</h1>
  }
  else if (rounds == 0) {
    return (
      <>
        <h1>GET READY</h1>
        <h1 class='time'>{timer.getTimeValues().seconds}</h1>
      </>

    )
  }
  else if (workRound) {
    return (
      <>
        <h2 class='top-left'>TABATA - ROUND {rounds} OF {round}</h2>
        <h1>WORK</h1>
        <h1 class='time'><span class='red'>{rounds} </span>{timer.getTimeValues().toString(['minutes', 'seconds'])}</h1>
      </>
    )
  }
  else if (!workRound) {
    return (
      <>
        <h2 class='top-left'>TABATA - ROUND {rounds} OF {round}</h2>
        <h1>REST</h1>
        <h1 class='time'> <span class='red'>{rounds} </span>{timer.getTimeValues().toString(['minutes', 'seconds'])}</h1>
      </>
    )
  }



}
export default CountDown