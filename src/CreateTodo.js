import { useState } from "react";

export default function CreateTodo({ user, handleAddTodo }) {

  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  //const [ dateCreated, setDateCreated ] = useState('');
  function handleTitle (evt) { setTitle(evt.target.value) };
  function handleContent (evt) { setContent(evt.target.value) };
  function handleCreate () { 
    const newTodo = { title, content, author: user, dateCreated: Date(Date.now()) , complete: false, dataCompleted: ""};
    handleAddTodo(newTodo);
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
