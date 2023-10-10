import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function UserBar({ user, setUser, setTodos }) {
  if (user) {
    return <Logout user={user} setUser={setUser} setTodos={setTodos}/>;
  } else {
    return (
      <>
        <Login setUser={setUser} />
        <Register setUser={setUser} />
      </>
    );
  }
}
