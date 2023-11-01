import UserBar from "./UserBar";
import { useReducer } from 'react';
import appReducer from "./reducers";
import { StateContext } from "./context";

function App() {

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: []
  });

  const handleAddTodo = (newTodo) => {
    dispatch({ type: "CREATE_TODO", ...newTodo });
  }

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <UserBar handleAddTodo={handleAddTodo}/>
      </StateContext.Provider>
    </div>
  );
}

export default App;
