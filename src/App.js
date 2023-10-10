import UserBar from "./UserBar";
import CreateTodo from "./CreateTodo";
import { useState } from 'react';
import TodoList from "./TodoList";

function App() {
  
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState([]);
  const handleAddTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };


  return (
    <div>
      <UserBar user={user} setUser={setUser} setTodos={setTodos}/>
      <CreateTodo user={user} handleAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
