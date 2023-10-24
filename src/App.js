import UserBar from "./UserBar";
import { useReducer } from 'react';
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
      <UserBar user={user} dispatchUser = {dispatch} handleAddTodo={handleAddTodo} todos={todos} dispatchTodo = {dispatch}/>
    </div>
  );
  // <CreateTodo user={user} handleAddTodo={handleAddTodo} />
  // <TodoList todos={todos} dispatchTodo = {dispatch} />
}

export default App;
