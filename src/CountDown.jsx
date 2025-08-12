import React from 'react'
import { useState, useEffect } from 'react'
import useTimer from 'easytimer-react-hook';
import { Timer } from "easytimer.js";
import * as Tone from 'tone'


function CountDown({ name, sets = 1, round, work, rest, restBetweenRounds = 0 }) {
  const [currentSet, setCurrentSet] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [workRound, setWorkRound] = useState(true);
  const [restBetweenSet, setRestBetweenSet] = useState(false);
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
      // If all sets are completed
      if (currentSet > sets) {
        timer.stop();
      }
      // Initial "GET READY" phase
      else if (currentSet == 0 && rounds == 0) {
        timer.stop();
        setCurrentSet(1);
        setRounds(1);
        setWorkRound(true);
        setRestBetweenSet(false);
        timer.start({ startValues: { seconds: work }, target: { seconds: 0 } })
      }
      // During work phase, switch to rest
      else if (workRound && rest > 0) {
        timer.stop();
        setWorkRound(false);
        setRestBetweenSet(false);
        timer.start({ startValues: { seconds: rest }, target: { seconds: 0 } })
      }
      // After rest phase within a round
      else if (!workRound && !restBetweenSet) {
        timer.stop();
        // If we've completed all rounds in current set
        if (rounds >= round) {
          // If this is the last set, finish
          if (currentSet >= sets) {
            setCurrentSet(currentSet + 1);
          }
          // If we have more sets and break time is set, start break between sets
          else if (currentSet < sets && restBetweenRounds > 0) {
            setRestBetweenSet(true);
            timer.start({ startValues: { seconds: restBetweenRounds }, target: { seconds: 0 } })
          }
          // If no break between sets, go directly to next set
          else {
            setCurrentSet(currentSet + 1);
            setRounds(1);
            setWorkRound(true);
            timer.start({ startValues: { seconds: work }, target: { seconds: 0 } });
          }
        }
        // Continue to next round within the same set
        else {
          setWorkRound(true);
          setRounds(rounds + 1);
          timer.start({ startValues: { seconds: work }, target: { seconds: 0 } });
        }
      }
      // After break between sets, start next set
      else if (restBetweenSet) {
        timer.stop();
        setCurrentSet(currentSet + 1);
        setRounds(1);
        setWorkRound(true);
        setRestBetweenSet(false);
        timer.start({ startValues: { seconds: work }, target: { seconds: 0 } });
      }
    })
  },[currentSet, rounds, workRound, restBetweenSet]);


  if (currentSet > sets) {
    timer.stop();
    return <h1>FINISHED</h1>
  }
  else if (currentSet == 0) {
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
        <h2 className='top-left'>{name}</h2>
        <h3 className='top-left' style={{paddingTop: '60px'}}>
          <span className='red'>SET {currentSet}/{sets}</span>
        </h3>
        <h1>WORK</h1>
        <h3>
          <span style={{color: 'cyan'}}>ROUND {rounds}/{round}</span>
        </h3>
        <h1 className='time' style={{color: 'white'}}>
          {timer.getTimeValues().toString(['minutes', 'seconds'])}
        </h1>
        <img className='bottom-right' src="/k-logo.png" alt=""/>
      </>
    )
  }
  else if (!workRound && !restBetweenSet) {
    return (
      <>
        <h2 className='top-left'>{name}</h2>
        <h3 className='top-left' style={{paddingTop: '60px'}}>
          <span className='red'>SET {currentSet}/{sets}</span>
        </h3>
        <h1>REST</h1>
        <h3>
          <span style={{color: 'cyan'}}>ROUND {rounds}/{round}</span>
        </h3>
        <h1 className='time' style={{color: 'white'}}>
          {timer.getTimeValues().toString(['minutes', 'seconds'])}
        </h1>
        <img className='bottom-right' src="/k-logo.png" alt=""/>
      </>
    )
  }
  else if (restBetweenSet) {
    return (
      <>
        <h2 className='top-left'>{name} - SET {currentSet} OF {sets} COMPLETE</h2>
        <h1>BREAK</h1>
        <h1 className='time'> <span className='red'>{currentSet} </span>{timer.getTimeValues().toString(['minutes', 'seconds'])}</h1>
        <img className='bottom-right' src="/k-logo.png" alt=""/>
      </>
    )
  }



}
export default CountDown