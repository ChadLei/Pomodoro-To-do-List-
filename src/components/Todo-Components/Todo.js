import React, { Component } from 'react';

{/* Creates individual todo components that are repeatedly rendered */}
{/* Returns the name of the task*/}
const Todo = props => {
  return (
    <div
      key={props.todo.id}
      onClick={ event => {
        props.toggleComplete(props.todo.id)
      }}>
      <p>{props.todo.task}</p>
    </div>
  )
}

export default Todo;
