function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
        return {
          username: action.username,
          access_token: action.access_token,
        };
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
                _id: action.id
            };
            return [newTodo, ...state];
        case "TOGGLE_TODO":
            return state.map(todo => {
                if (todo._id === action._id) {
                    return {
                        ...todo,
                        complete: !todo.complete,
                        dateCompleted: todo.complete ? null : Date(Date.now())
                    }
                }
                return todo;
            });
        case "CLEAR_TODO":
            return [];
        case "DELETE_TODO":
            return state.filter(todo => todo._id !== action._id);
        case "FETCH_TODOS":
            return action.todos;
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