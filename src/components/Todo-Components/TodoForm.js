import React, { Component } from 'react';
import styled from "styled-components";
import { Button } from 'react-bootstrap';

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column
  /* position: relative; */

`
const StyledInput = styled.input`
  margin-top: 50px;

`
const ButtonsDiv = styled.div`
  display: flex;
  align-items: stretch;
  padding-top: 20px;
`
const StyledButton = styled.button`
  font-size: 15px;
  /* display:inline-block; */
  /* padding:0.5em 3em; - Padding dynamically changes button size based off of text*/
  width: 185px;
  line-height: 40px;
  border:0.16em solid white;
  margin:0.5em .08em 0.3em .8em;
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
  &:focus{
  outline: none;
  }
  &:active {
  box-shadow: 0 5px #A9837A;

  }
`

{/* Form for users to add and remove tasks*/}
const TodoForm = props => {
  return (
    <StyledForm>
      <StyledInput
        name='todo'
        value={props.value}
        type='text'
        onChange={props.inputChangeHandler}
        placeholder='Enter a task'
      />
      <ButtonsDiv>
        <StyledButton onClick={props.addTask}>Add Task</StyledButton>
        <StyledButton onClick={props.removeItems}>Remove Completed</StyledButton>
        <StyledButton onClick={props.removeAllItems}>Remove All</StyledButton>
      </ButtonsDiv>
    </StyledForm>
  )
}

export default TodoForm;
