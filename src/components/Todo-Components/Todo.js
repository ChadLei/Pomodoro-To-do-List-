import React, { Component } from 'react';
import styled from "styled-components";

{/* Creates individual todo components that are repeatedly rendered */}
{/* Returns the name of the task*/}

const StyledDiv = styled.div`
  /* &:active {
  box-shadow: 0 5px #A9837A; */
  }
`


const Todo = props => {
  return (
    <StyledDiv
      key={props.todo.id}
      onClick={ event => {
        props.toggleComplete(props.todo.id)
      }}>
      <p>• {props.todo.task}</p>
    </StyledDiv>
  )
}

export default Todo;
