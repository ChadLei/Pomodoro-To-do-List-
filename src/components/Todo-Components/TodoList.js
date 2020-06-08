import React, { Component } from 'react';
import styled from "styled-components";
import Todo from './Todo';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  margin-top: 50px;
  font-size: 25px;
  text-transform:uppercase;
`

{/* Displays tasks by mapping over the array of todos*/}
{/* Returns all the current tasks*/}
const TodoList = props => {
  return (
    <StyledDiv>
      {props.todos.map((todo, id) => (
        <Todo
          todo={todo}
          key={id}
          toggleComplete={props.toggleComplete}
        />
      ))}
    </StyledDiv>
  )
}

export default TodoList;
