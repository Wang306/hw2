export default function Logout({ user, dispatchUser }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatchUser({ type: "LOGOUT" });
        dispatchUser({ type: "CLEAR_TODO" });
      }}
    >
      Logged in as: <b>{user}</b>
      <input type="submit" value="Logout" />
    </form>
  );
}
