import React from 'react'
import { useState, useEffect } from 'react'
import useTimer from 'easytimer-react-hook';
import { Timer } from "easytimer.js";
import * as Tone from 'tone'


function CountUp({ time }) {
  const [rounds, setRounds] = useState(0);
  const [timer, isTargetAchieved] = useTimer({
    precision: 'seconds',
    startValues: { seconds: 10 },
    target: { seconds: 0 },
    countdown: true,
  });
  const [timer2, isTargetAchieved2] = useTimer({
    precision: 'seconds',
    startValues: { seconds: 0 },
    target: { seconds: time * 60 },
    countdown: false,
  });

  useEffect(() => {
    timer.addEventListener('targetAchieved', () => {
      setRounds(1)
      timer2.start()
    })

    timer2.addEventListener('targetAchieved', () => {
      setRounds(2)
    })

    timer.addEventListener('secondsUpdated', () => {
      if (timer.getTimeValues().seconds == 3) {
        new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.4");
      }
      else if (timer.getTimeValues().seconds == 2) {
        new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.4");
      }
      else if (timer.getTimeValues().seconds == 1) {
        new Tone.Oscillator(900, "triangle").toDestination().start().stop("+0.6");
      }
    })

    timer2.addEventListener('secondsUpdated', () => {
      if (timer2.getTimeValues().seconds == time * 60 - 3) {
        new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.4");
      }
      else if (timer2.getTimeValues().seconds == time * 60 - 2) {
        new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.4");
      }
      else if (timer2.getTimeValues().seconds == time * 60 - 1) {
        new Tone.Oscillator(900, "triangle").toDestination().start().stop("+0.6");
      }
    })

    timer.start();
  }, []);

  // useEffect(() => {
  // //clear listener secondsUpdated
  // console.log('rounds: ', rounds)
  //   if (rounds == 0) {
  //     timer.addEventListener('secondsUpdated', () => {
  //       if (timer.getTimeValues().seconds == 3) {
  //         new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.3");
  //       }
  //       else if (timer.getTimeValues().seconds == 2) {
  //         new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.3");
  //       }
  //       else if (timer.getTimeValues().seconds == 1) {
  //         new Tone.Oscillator(900, "triangle").toDestination().start().stop("+0.5");
  //       }
  //     })
  //   }
  //   else if (rounds == 1) {
  //     timer.addEventListener('secondsUpdated', () => {
  //       if (timer.getTimeValues().seconds == time*60-3) {
  //         new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.3");
  //       }
  //       else if (timer.getTimeValues().seconds == time*60-2) {
  //         new Tone.Oscillator(600, "triangle").toDestination().start().stop("+0.3");
  //       }
  //       else if (timer.getTimeValues().seconds == time*60-1) {
  //         new Tone.Oscillator(900, "triangle").toDestination().start().stop("+0.5");
  //       }
  //     })
  //   }

  // }, [rounds])

  if (rounds == 0) {
    return (
      <>
        <h2 className='top-left'>FOR TIME</h2>
        <h1>GET READY</h1>
        <h1 className='time'>{timer.getTimeValues().seconds}</h1>
        <img className='bottom-right' src="/k-logo.png" alt=""/>
      </>
    )
  }
  if (rounds == 1) {
    return (
      <>
        <h2 className='top-left'>FOR TIME</h2>
        <h1 className='time'>{timer2.getTimeValues().toString(['minutes', 'seconds'])}</h1>
        <img className='bottom-right' src="/k-logo.png" alt=""/>
      </>
    )
  }
  if (rounds == 2) {
    return <h1>FINISHED</h1>
  }
}

export default CountUp