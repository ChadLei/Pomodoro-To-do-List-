import React, { Component } from 'react';
import styled from "styled-components";

const PomodoroDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ClockP = styled.p`
  font-size: 200px;
  color: white;
  font-family: 'digital-7', sans-serif;
  margin-top: 50px;
`
const ButtonsDiv = styled.div`
  display: flex;
`
// https://fdossena.com/?p=html5cool/buttons/i.frag
const StyledButton = styled.button`
  font-size: 50px;
  /* display:inline-block; */
  /* padding:0.5em 3em; - Padding dynamically changes button size based off of text*/
  width: 220px;
  line-height: 70px;
  border:0.09em solid white;
  margin:0.5em 0.3em 0.5em 0.3em;
  box-sizing: border-box;
  text-decoration:none;
  text-transform:uppercase;
  font-family:'Roboto',sans-serif;
  font-weight:400;
  color: white;
  background: #EEB9AD;
  text-align:center;
  transition: all 0.15s;
  border-radius: 20px;
  &:hover{
  color:#F3F3F3;
  border-color:#F3F3F3;
  }
  /* Removes blue border when button is clicked */
  &:focus{
  outline:none;
  }
  /* Gives the button a clicked-effect */
  &:active {
  box-shadow: 0 5px #A9837A;
  }
  @media all and (max-width:30em){
  a.button2{
  display:flex;
  margin:0.4em auto;
  }
`

const Pomodoro = props => {
  return (
    <PomodoroDiv>
      <ClockP>
        {/*Any digit less than 10 is a single digit, so the 0 is added so form stays in tact*/}
        {props.breakTime ? props.restMinutes : props.workMinutes}:{props.seconds < 10 ? `0${props.seconds}` : props.seconds}
      </ClockP>
      {/*If startTime is false, then onClick func will start our timer*/}
      <ButtonsDiv>
        <StyledButton onClick={props.startTime ? props.pauseTimer : props.startTimer}>
          {props.startTime ? 'Pause' : 'Start'}
        </StyledButton>
        <StyledButton onClick={props.resetTimer}>
          Reset
        </StyledButton>
      </ButtonsDiv>
    </PomodoroDiv>
  )
}

export default Pomodoro;
