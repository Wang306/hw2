function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
        case "REGISTER":
            return action.username;
        case "LOGOUT":
            return "";
        default:
            return state;
    }
}

function todoReducer(state, action) {
    switch (action.type) {
        case "CREATE_TODO":
            const newTodo = {
                title: action.title,
                content: action.content,
                author: action.author,
                dateCreated: action.dateCreated,
                complete: action.complete,
                dateCompleted: action.dateCompleted,
                id: action.id
            };
            return [newTodo, ...state];
        case "TOGGLE_TODO":
            return state.map(todo => {
                if (todo.id === action.id) {
                    return {
                        ...todo,
                        complete: !todo.complete,
                        dateCompleted: todo.complete ? "" : Date(Date.now())
                    }
                }
                return todo;
            });
        case "CLEAR_TODO":
            return [];
        case "DELETE_TODO":
            return state.filter(todo => todo.id !== action.id);
        case "FETCH_POSTS":
            return action.posts;
        default:
            return state;
    }
}

export default function appReducer(state, action) {
    return {
        user: userReducer(state.user, action),
        todos: todoReducer(state.todos, action)
    };
}