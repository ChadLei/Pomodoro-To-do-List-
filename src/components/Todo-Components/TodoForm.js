import React, { Component } from 'react';
import styled from "styled-components";

const StyledForm = styled.form`
  /* flex-direction: column;
  align-items: center; */
`

{/* Form for users to add and remove tasks*/}
const TodoForm = props => {
  return (
    <StyledForm>
      <input
        name='todo'
        value={props.value}
        type='text'
        onChange={props.inputChangeHandler}
        placeholder='Enter a task'
      />
      <button onClick={props.addTask}>Add a Task</button>
      <button onClick={props.removeItems}>Remove Completed</button>
    </StyledForm>
  )
}

export default TodoForm;
