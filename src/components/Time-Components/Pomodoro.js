import React, { Component } from 'react';

const Pomodoro = props => {
  return (
    <div>
      <p>
        {/*Any digit less than 10 is a single digit, so the 0 is added so form stays in tact*/}
        {props.breakTime ? props.restMinutes : props.workMinutes}:
        {props.seconds < 10 ? `0${props.seconds}` : props.seconds}
      </p>
      {/*If startTime is false, then onClick func will start our timer*/}
      <button onClick={props.startTime ? props.pauseTimer : props.startTimer}>
        {props.startTime ? 'Pause' : 'Start'}
      </button>
    </div>
  )
}

export default Pomodoro;
