import UserBar from "./UserBar";
import appReducer from "./reducers";
import { StateContext } from "./context";
import { useReducer, useEffect } from 'react';
import { useResource } from "react-request-hook";
import TodoList from "./TodoList";

function App() {

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: []
  });

  const [todoResponse, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

  useEffect(getTodos, [getTodos]);

  useEffect(() => {
    if (todoResponse && todoResponse.data) {
        dispatch({ type: 'FETCH_TODOS', todos: todoResponse.data.reverse() })
    }    
  }, [todoResponse]);





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
