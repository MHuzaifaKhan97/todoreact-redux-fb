import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './todoTypes';

import db from '../../firebase/firebase';
const initState = {
    todos: [
        // { id: id++, text: "Learn React" },
        // { id: id++, text: "Learn Redux" },
        // { id: id++, text: "Learn NodeJS" }
    ]
}
let todosValue = []
async function getInitState() {
    await db.ref('todos').once('value', (data) => {
        todosValue = Object.values(data.val());
    })
    console.log(todosValue)
    initState.todos = todosValue;
    // console.log(Object.keys(data.val()))
    console.log(initState.todos)
}

getInitState()

const todoReducer = (state = initState, action) => {

    switch (action.type) {
        case ADD_TODO: db.ref('todos/' + action.payload.id).set(action.payload)
            return {
                ...state,
                todos: [...state.todos, action.payload],
            }
        case REMOVE_TODO: db.ref('todos/' + action.payload.id).remove()
            return {
                ...state,
                todos: state.todos.filter((todo) => {
                    return todo.id !== action.payload.id
                })
            }
        case UPDATE_TODO: db.ref('todos/' + action.payload.id).update(action.payload)
            return {
                ...state,
                todos: [action.payload, ...state.todos.filter((todo) => todo.id !== action.payload.id)]
            }
        default: return state;
    }
}

export default todoReducer;