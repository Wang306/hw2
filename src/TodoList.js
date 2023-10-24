import Todo from "./Todo";

export default function TodoList({ todos = [], dispatchTodo }) {
  return (
    <div>
      {todos.map((t, i) => (
        <Todo {...t} key={t.id} dispatchTodo={dispatchTodo}/>
      ))}
    </div>
  );
}
