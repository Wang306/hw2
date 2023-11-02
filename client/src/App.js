import UserBar from "./UserBar";
import appReducer from "./reducers";
import { StateContext } from "./context";
import { useReducer, useEffect } from 'react';
import { useResource } from "react-request-hook";
import TodoList from "./TodoList";

function App() {
  const [ todos, getTodos ] = useResource(() => ({
    url: '/todos',
    method: 'get'
  }));
  useEffect(getTodos, []);
  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data.reverse()});
    }
  }, [todos]);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: []
  });

  //const handleAddTodo = (newTodo) => {
  //  dispatch({ type: "CREATE_TODO", ...newTodo });
  //}

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <UserBar />
        <TodoList />
      </StateContext.Provider>
    </div>
  );
}

export default App;
