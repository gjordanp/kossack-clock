import React from 'react'
import { useState, useEffect } from 'react'
import useTimer from 'easytimer-react-hook';
import { Timer } from "easytimer.js";
import * as Tone from 'tone'


function CountDown({ name, round, work, rest, restBetweenRounds = 0 }) {
  const [rounds, setRounds] = useState(0);
  const [workRound, setWorkRound] = useState(true);
  const [restBetweenRound, setRestBetweenRound] = useState(false);
  const [timer, isTargetAchieved] = useTimer({
    precision: 'seconds',
    startValues: { seconds: 10 },
    target: { seconds: 0 },
    countdown: true
  });



  useEffect(() => {
    timer.start();

    timer.addEventListener('secondsUpdated', () => {
      if (timer.getTimeValues().seconds == 3) {
        // synth.triggerAttackRelease('C5', '0.1');
        // new Tone.PolySynth().toDestination().triggerAttackRelease(["D4"], 0.3);
        new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.4");
        // console.log('oscillator1')
      }
      else if (timer.getTimeValues().seconds == 2) {
        // synth.triggerAttackRelease('C5', '0.1');
        // new Tone.PolySynth().toDestination().triggerAttackRelease(["D4"], 0.3);
        new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.4");
        // console.log('oscillator2')
      }
      else if (timer.getTimeValues().seconds == 1) {
        // synth.triggerAttackRelease('E5', '0.4');
        // new Tone.PolySynth().toDestination().triggerAttackRelease(["F4"], 0.6);
        new Tone.Oscillator(900, "triangle").toDestination().start().stop("+0.6");
        // console.log('oscillator3')
      }
    })
  }, []);

  useEffect(() => {
    timer.addEventListener('targetAchieved', () => {
      if (rounds > round) {
        timer.stop();
      }
      else if (rounds == 0) //si es el primer round no hacemos nada
      {
        timer.stop();
        setRounds(rounds + 1);
        setWorkRound(true);
        setRestBetweenRound(false);
        timer.start({ startValues: { seconds: work }, target: { seconds: 0 } })
      }
      else if (workRound && rest > 0) {
        timer.stop();
        setWorkRound(false);
        setRestBetweenRound(false);
        timer.start({ startValues: { seconds: rest }, target: { seconds: 0 } })
      }
      // After rest period, check if we need rest between rounds
      else if (!workRound && !restBetweenRound) {
        timer.stop();
        // If this is the last round, finish
        if (rounds >= round) {
          setRounds(rounds + 1);
        }
        // If we have more rounds and restBetweenRounds is set, start rest between rounds
        else if (rounds < round && restBetweenRounds > 0) {
          setRestBetweenRound(true);
          timer.start({ startValues: { seconds: restBetweenRounds }, target: { seconds: 0 } })
        }
        // If no rest between rounds, go directly to next round
        else {
          setWorkRound(true);
          setRounds(rounds + 1);
          timer.start({ startValues: { seconds: work }, target: { seconds: 0 } });
        }
      }
      // After rest between rounds, start next round
      else if (restBetweenRound) {
        timer.stop();
        setWorkRound(true);
        setRestBetweenRound(false);
        setRounds(rounds + 1);
        timer.start({ startValues: { seconds: work }, target: { seconds: 0 } });
      }
    })
  },[rounds, workRound, restBetweenRound]);


  if (rounds > round) {
    timer.stop();
    return <h1>FINISHED</h1>
  }
  else if (rounds == 0) {
    return (
      <>
        <h1>GET READY</h1>
        <h1 className='time'>{timer.getTimeValues().seconds}</h1>
        <img className='bottom-right' src="/k-logo.png" alt=""/>
      </>

    )
  }
  else if (workRound) {
    return (
      <>
        <h2 className='top-left'>{name} - ROUND {rounds} OF {round}</h2>
        <h1>WORK</h1>
        <h1 className='time'><span className='red'>{rounds} </span>{timer.getTimeValues().toString(['minutes', 'seconds'])}</h1>
        <img className='bottom-right' src="/k-logo.png" alt=""/>
      </>
    )
  }
  else if (!workRound && !restBetweenRound) {
    return (
      <>
        <h2 className='top-left'>{name} - ROUND {rounds} OF {round}</h2>
        <h1>REST</h1>
        <h1 className='time'> <span className='red'>{rounds} </span>{timer.getTimeValues().toString(['minutes', 'seconds'])}</h1>
        <img className='bottom-right' src="/k-logo.png" alt=""/>
      </>
    )
  }
  else if (restBetweenRound) {
    return (
      <>
        <h2 className='top-left'>{name} - ROUND {rounds} OF {round}</h2>
        <h1>BREAK</h1>
        <h1 className='time'> <span className='red'>{rounds} </span>{timer.getTimeValues().toString(['minutes', 'seconds'])}</h1>
        <img className='bottom-right' src="/k-logo.png" alt=""/>
      </>
    )
  }



}
export default CountDown