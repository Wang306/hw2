import { useResource } from "react-request-hook";

export default function Todo({ title, content, author, dateCreated, complete, dateCompleted, id, dispatchTodo }) {

  
  const [user, toggleTodo] = useResource((title, content, author, dateCreated, complete, dateCompleted, id) => ({
    url: "/users/" + id,
    method: "put",
    data: {title, content, author, dateCreated, complete, dateCompleted, id}
  }));
  
  
  const handleComplete = () => {
    console.log("enter toggle");
    toggleTodo(title, content, author, dateCreated, complete, dateCompleted, id);
    dispatchTodo({
      type: "TOGGLE_TODO", 
      id
    });
  };

  const handleDelete = () => {
    dispatchTodo({ 
      type: "DELETE_TODO",
      id
    });
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>{content}</div>
      <br />
      <i>Written by <b>{author}</b></i>
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

