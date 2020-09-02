import React, {Component} from 'react';
import './todoList.styles.css';
import TodoItems from '../todoItems/todoItems.component';
import PropTypes from 'prop-types';

class TodoList extends Component {
    render() {
        return this.props.todos.map((todo) => (
            <TodoItems key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo}/>
        ))
    }
}

TodoList.protoTypes = {
    todos: PropTypes.array.isRequired
}

export default TodoList;