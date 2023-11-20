import { useState, useContext, useEffect } from "react";
import { StateContext } from "./context";
import { v4 as uuidv4 } from "uuid";
import { useResource } from "react-request-hook";

export default function CreateTodo() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');

  const [ todo, createTodo ] = useResource(({ title, content, author, dateCreated, complete, dateCompleted }) => ({
    url: "/todo",
    method: "post",
    headers: { Authorization: `${state.user.access_token}`},
    data: { title, content, author, dateCreated, complete, dateCompleted }
  }));

  useEffect(() => {
    if (todo.isLoading === false && todo.data) {
      dispatch({
        type: "CREATE_TODO",
        title: todo.data.title,
        content: todo.data.content,
        author: user.username,
        dateCreated: todo.data.dateCreated,
        complete: todo.data.complete,
        dateCompleted: todo.data.dateCompleted,
        id: todo.data._id
      })
    }
  }, [todo]);

  function handleTitle (evt) { setTitle(evt.target.value) };
  function handleContent (evt) { setContent(evt.target.value) };

  function handleCreate () { 
    const newTodo = { 
      title,
      content,
      author: user.username,
      dateCreated: Date(Date.now()),
      complete: false,
      dateCompleted: null
     };
    createTodo(newTodo);
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleCreate();
    }}>
      <div>
        Author: <b>{user.username}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input type="text" name="create-title" id="create-title" value={title} onChange={handleTitle}/>
      </div>
      <textarea name="create-content" id="create-content" value={content} onChange={handleContent}/>
      <input type="submit" value="Create" disabled={title.length === 0}/>
    </form>
  );
}
