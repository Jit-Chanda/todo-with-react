import React, {Component} from 'react';
import './App.css';
//import {v4 as uuidv4} from 'uuid';
import { BrowserRouter, Route } from "react-router-dom";
import TodoList from './components/todoList/todoList.component';
import Header from './components/header/header.component';
import AddTodoItem from './components/addTodo/addTodo.component';
import About from './components/about/about.component';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data}))
  }

  //Toggle Complete
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo=> {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })})
  }

  //Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({todos: [...this.state.todos.filter(todo=> todo.id !== id)]}))
  }

  //Add Todo Item
  addTodoItem = (title) => {
    // const newTodo = {
    //   id: uuidv4(),
    //   title: title,
    //   completed: false
    // }
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false
    })
    .then(res => this.setState({todos: [...this.state.todos, res.data]}))
    
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path='/' render={props=> (
              <React.Fragment>
                <AddTodoItem addTodoItem={this.addTodoItem}/>
                <TodoList todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
