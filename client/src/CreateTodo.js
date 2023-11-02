import { useState, useContext } from "react";
import { StateContext } from "./context";
import { v4 as uuidv4 } from "uuid";
import { useResource } from "react-request-hook";

export default function CreateTodo() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  function handleTitle (evt) { setTitle(evt.target.value) };
  function handleContent (evt) { setContent(evt.target.value) };

  const [todo , createTodo ] = useResource(({ title, content, author, dateCreated, complete, dateCompleted, id }) => ({
    url: '/todos',
    method: 'post',
    data: { title, content, author, dateCreated, complete, dateCompleted, id }
  }));

  function handleCreate () { 
    const newTodo = { title, content, author: user, dateCreated: Date(Date.now()) , complete: false, dateCompleted: "", id: uuidv4() };
    createTodo(newTodo);
    dispatch({ type: 'CREATE_TODO', ...newTodo });
    //handleAddTodo(newTodo);
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleCreate();
    }}>
      <div>
        Author: <b>{user}</b>
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
