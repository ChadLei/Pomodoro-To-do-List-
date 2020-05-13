// Tutorials:
// - Part 1: https://itnext.io/how-to-build-a-productivity-application-in-react-part-1-9f0c7ee65772
// - Part 2: https://itnext.io/how-to-build-a-productivity-application-in-react-part-2-7a5f9b8fed3
// - Part 3: https://itnext.io/how-to-build-a-productivity-application-in-react-part-3-a1c4e212fdcb
//   - Good explaination of local storage: https://stackoverflow.com/questions/54135796/how-i-can-add-local-storage-to-my-react-js-app
// - Part 4: https://itnext.io/how-to-build-a-productivity-application-in-react-part-4-14f1ed04dc8f

import React, { Component } from 'react';
import styled from "styled-components";

import TodoList from './components/Todo-Components/TodoList';
import TodoForm from './components/Todo-Components/TodoForm';
import Pomodoro from './components/Time-Components/Pomodoro';

const StyledDiv = styled.div`
  flex-direction: column;
  align-items: center;
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ // Array of our to-do items
        // task: '',
        // id: '',
        // completed: false
      }],
      todo: '', // Name of the individual to-do item
      restMinutes: 5, // Represents the 5-minute break interval
      workMinutes: 25, // Represents the 25-minute work period
      seconds: 0, // Represents the countdown between whole minutes
      breakTime: false, // Whether or not we should be displaying restMinutes (time for a break)
      startTime: false, // The opposite of breakTime
      interval: '' // Refers to the period of time between the actions of your timer
    }
  }

  // Handles input change from form (Sets 'todo' inside state to input value)
  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  // Takes a click event and creates a new to-do item
  addTask = event => {
    // preventDefault stops page from refreshing with every new to-do item
    event.preventDefault();
    // To-do item object
    let newTask = {
      task: this.state.todo,
      id: Date.now(), // Any unique identifier would work as well
      completed: false
    };
    // Adds newTask to the array of to-do items
    this.setState({
      todos: [...this.state.todos, newTask], // "..." is the spread operator to ensure there is only 1 array
      todo: '' // Resets todo so it can be filled again
    })
  }

  // Takes a item ID and sets the item as Completed
  toggleComplete = itemId => {
    // Maps over todos array & changes completed value if id matches
    const todos = this.state.todos.map(todo => {
      if (todo.id == itemId) {
        todo.completed = !todo.completed
      }
      return todo
    });
    this.setState({todos,todo:''})
  }

  // Removes completed to-do items
  removeItems = event => {
    event.preventDefault();
    // Sets todos array to a new array of only non-completed items based off the previous state
    this.setState(prevState => {
      return {
        todos: prevState.todos.filter(todo => {
          return !todo.completed;
        })
      }
    })
  }

  // Loads Items in Local Storage onto our Application
  addLocalStorage = () => {
    for (let key in this.state) { // Takes all of our items in state
      if (localStorage.hasOwnProperty(key)) { // Checks if each item in state is in our local storage
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value); // Converts item strings to JavaScript objects
          this.setState({[key]:value}) // Renders the correct data to the screen
          console.log({[key]:value});
        }
        catch(event) {
          this.setState({[key]:value})
        }
      }
    }
  }

  // Adds Items in State to our Local Storage
  saveLocalStorage = () => {
    for (let key in this.state) {
      let value = JSON.stringify(this.state[key]); // Transforms any object/array into a string
      localStorage.setItem(key, value);
      console.log('hello');
      // console.log(value);
    }
  }

  // componentDidMount is invoked immediately after a component is mounted
  // Pulls items from local storage & renders them to the page
  componentDidMount = () => {
    // Upon mounting the page, this will render each of our saved tasks to the page
    this.addLocalStorage();
    // Calls saveLocalStorage upon the event of unloading our application, & makes sure it runs our it before we unload.
    window.addEventListener(
      "beforeunload",
      this.saveLocalStorage.bind(this)
    )
  }

  // componentWillUnmount is invoked immediately before a component is unmounted and destroyed
  // Removes our event listener on the window upon un-mounting our application to clean up behind ourselves
  componentWillUnMount = () => {
    window.removeEventListener(
      "beforeunload",
      this.saveLocalStorage.bind(this)
    )
  }

  // Timer that counts down the seconds until resetting to 0
  timer = () => {
    // Seconds will start at 0, move to 59, count down to 0, reset, & repeat
    this.setState({
      seconds: this.state.seconds === 0 ? 59 : this.state.seconds - 1
    })
    // Checks against our seconds to determine when to subtract minutes from overall minutes
    if (this.state.break) {
      this.setState({restMinutes: this.state.seconds === 0 ? this.state.restMinutes - 1
        : this.state.restMinutes === 5 ? 4 : this.state.restMinutes})
    }
    // Resets timer back to 5 after break time is over
    if (this.state.restMinutes === -1) {
      this.setState({restMinutes: 5, break: false})
    }
    else { // Does the same for workMinutes
      this.setState({workMinutes: this.state.seconds === 0 ? this.state.workMinutes - 1
        : this.state.workMinutes === 25 ? 24 : this.state.workMinutes})
      if(this.state.workMinutes === -1) {
        this.setState({workMinutes:25, break: true})
      }
    }
  }

  // Starts the timer
  startTimer = () => {
    this.setState({interval: setInterval(this.timer, 1000),
      startTime: !this.state.startTime});
  }

  // Pauses the Timer
  pauseTimer = () => {
    this.setState(prevState => {
      return {
        restMinutes: prevState.restMinutes,
        workMinutes: prevState.workMinutes,
        seconds: prevState.seconds,
        breakTime: prevState.breakTime,
        startTime: false,
        interval: clearInterval(prevState.interval)
      };
    })
  }


  render() {
    return (
      <div className='App'>
        <h1>To-Do List</h1>
        <TodoList
          todos={this.state.todos}
          toggleComplete={this.toggleComplete}
        />
        <TodoForm
          todos={this.state.todos}
          value={this.state.todo}
          inputChangeHandler={this.inputChangeHandler}
          addTask={this.addTask}
          removeItems={this.removeItems}
        />
        <Pomodoro
          timer={this.timer}
          workMinutes={this.state.workMinutes}
          restMinutes={this.state.restMinutes}
          seconds={this.state.seconds}
          startTime={this.state.startTime}
          breakTime={this.state.breakTime}
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
        />
      </div>
    );
  }
}

export default App;
