import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

export default function UserBar({ user, dispatchUser, handleAddTodo, todos, dispatchTodo }) {
  if (user) {
    return (
      <>
        <Logout user={user} dispatchUser={dispatchUser}/>
        <CreateTodo user={user} handleAddTodo={handleAddTodo} />
        <TodoList todos={todos} dispatchTodo = {dispatchTodo} />
      </>
      
    );
  } else {
    return (
      <>
        <Login dispatchUser={dispatchUser} />
        <Register dispatchUser={dispatchUser} />
      </>
    );
  }
}
