import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import CreateTodo from "./CreateTodo";
import { StateContext } from "./context";
import { useContext } from "react";

export default function UserBar({ handleAddTodo }) {

  const { state } = useContext(StateContext);
  const { user } = state;

  if (user) {
    return (
      <>
        <Logout />
        <CreateTodo />
      </>
      
    );
  } else {
    return (
      <>
        <Login />
        <Register />
      </>
    );
  }
}
