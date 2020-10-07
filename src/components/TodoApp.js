import React, { Component } from 'react'
import { addTodo, removeTodo, updateTodo } from '../redux/todo/todoActions'
import { connect } from 'react-redux';

import db from '../firebase/firebase';

class TodoApp extends Component {

    state = {
        text: '',
        todos: [],
        ids: [],
    }
    handleAdd = (e) => {
        e.preventDefault();
        let todoText = this.state.text;

        let id = db.ref("todos").push().key;
        // db.ref('todos').once('value', (data) => {
        //     console.log(data.val()[id].text)
        // })
        this.setState({
            ids: [...this.state.ids, id]
        })
        this.props.addTodo(todoText, id)
        this.setState({
            text: '',
            id: id
        })
    }
    handleRemove = (id) => {
        console.log("index", id);
        this.props.removeTodo(id)

    }
    handleUpdate = (id) => {
        console.log(id)
        let todoText = prompt("Enter Updated Text: ");
        this.props.updateTodo(todoText, id)
    }

    render() {
        const { text } = this.state;


        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
                    <a href="#" className="navbar-brand font-weight-bold text-uppercase">React Redux Todo App</a>
                    <button className="navbar-toggler">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
                <header>
                    <div className="container-fluid">
                        <div className="row my-5">
                            <div className="col-md-8 offset-md-2">
                                <div className="form-group input">
                                    <input type="text" value={text} onChange={(e) => this.setState({ text: e.target.value })} className="form-control" placeholder="Enter something..." />
                                    <button className="btn btn-primary" onClick={(e) => this.handleAdd(e)} >Add Item</button>
                                </div>
                                <ul className="todo-list py-5">
                                    <ListItems
                                        todos={this.props.todos}
                                        handleRemove={this.handleRemove}
                                        handleUpdate={this.handleUpdate}
                                    />
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
            </>
        )
    }
}

const ListItems = (props) => {
    return (
        props.todos.map((todo) => {

            return <li key={todo.id} >
                <span>{todo.text}</span>
                <button className="btn btn-warning mx-1" onClick={() => props.handleUpdate(todo.id)} > <i className="fa fa-edit"></i> </button>
                <button className="btn btn-danger mx-1" onClick={() => props.handleRemove(todo.id)} > <i className="fa fa-times"></i> </button>
            </li>
        })

    )
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}
// const mapDispatchToProps = (dispatch, state) => {
//     console.log(state)
//     return {
//         addTodo: () => dispatch(addTodo())
//     }
// }

export default connect(mapStateToProps, { addTodo, removeTodo, updateTodo })(TodoApp);
