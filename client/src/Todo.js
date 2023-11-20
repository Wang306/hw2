import { useResource } from "react-request-hook";
import { useContext, useEffect } from "react";
import { StateContext } from "./context";

export default function Todo({ title, content, author, dateCreated, complete, dateCompleted, _id }) {
  const { state, dispatch:dispatchTodo } = useContext(StateContext);
  const { user } = state;
  
  const [todoToggle, toggleTodo] = useResource((title, content, author, dateCreated, complete, dateCompleted, _id) => ({
    url: "/todo/" + _id,
    method: "put",
    headers: { Authorization: `${user.access_token}`},
    data: {title, content, author, dateCreated, complete, dateCompleted, _id}
  }));

  const [todoDelete, deleteTodo] = useResource(() => ({
    url: "/todo/" + _id,
    method: "delete",
    headers: { Authorization: `${user.access_token}`}
  }));

  useEffect(() => {
    if (
      todoToggle &&
      todoToggle.isLoading === false &&
      todoToggle.data
    ) {
      dispatchTodo({ 
        type: "TOGGLE_TODO",
        _id
      });
    }
  }, [todoToggle]);
  
  const handleComplete = () => {
    var dateNow = Date(Date.now());
    if (complete) { dateNow = null; }
    toggleTodo(title, content, author, dateCreated, !complete, dateNow, _id);
  };

  useEffect(() => {
    if (
      todoDelete &&
      todoDelete.isLoading === false &&
      todoDelete.data
    ) {
      dispatchTodo({ 
        type: "DELETE_TODO",
        _id
      });
    }
  }, [todoDelete]);
  

  const handleDelete = () => {
    deleteTodo();
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>{content}</div>
      <br />
      <i>Written by <b>{user.username}</b></i>
      <br />
      <i>Date Created: <b>{dateCreated}</b></i>
      <br />
      {complete ? (
        <i>Date Complete: <b>{dateCompleted}</b></i>
      ) : (
        <i>Date Complete: </i>
      )}
      <div>
        <input
          type="checkbox"
          checked={complete} 
          onChange={handleComplete}
        />
        <label>Complete</label>
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

