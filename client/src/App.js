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

  const [todosResponse, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` }
  }));

  useEffect(() => {
    if (state.user){
      getTodos();
    }
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (
      todosResponse &&
      todosResponse.isLoading === false &&
      todosResponse.data
    ) {
      console.log("Loading data...")
      dispatch({ type: "FETCH_TODOS", todos: todosResponse.data.todos.reverse() });
    }
  }, [todosResponse]);

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
