export default function Logout({ user, setUser , setTodos}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUser("");
        setTodos([]);
      }}
    >
      Logged in as: <b>{user}</b>
      <input type="submit" value="Logout" />
    </form>
  );
}
