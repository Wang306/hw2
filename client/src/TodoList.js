import Todo from "./Todo";
import { useContext } from "react";
import { StateContext } from "./context";

export default function TodoList() {
  const { state, dispatch:dispatchTodo } = useContext(StateContext);
  const { todos } = state;

  return (
    <div>
      {todos.map((t, i) => (
        <Todo {...t} key={t.id} dispatchTodo={dispatchTodo}/>
      ))}
    </div>
  );
}
