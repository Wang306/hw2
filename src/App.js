import UserBar from "./UserBar";
import CreateTodo from "./CreateTodo";
import { useReducer } from 'react';
import TodoList from "./TodoList";
import appReducer from "./reducers";

function App() {
  
  /*
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState([]);
  const handleAddTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };
  */

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: []
  });

  const { user, todos } = state;

  const handleAddTodo = (newTodo) => {
    dispatch({ type: "CREATE_TODO", ...newTodo });
  }

  return (
    <div>
      <UserBar user={user} dispatchUser = {dispatch} />
      <CreateTodo user={user} handleAddTodo={handleAddTodo} />
      <TodoList todos={todos} dispatchTodo = {dispatch} />
    </div>
  );
}

export default App;
