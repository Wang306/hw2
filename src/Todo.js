import { useState } from "react";

export default function Todo({ title, content, author, dateCreated, complete, todos = [], index }) {
  const [ check, setCheck ] = useState(complete);
  function handleComplete(){
    //console.log("handleComplete called");
    //console.log(posts[index]);
    if (check) {
      setCheck(false);
      todos[index].complete = false;
      todos[index].dateCompleted = "";
    } else {
      setCheck(true);
      todos[index].complete = true;
      todos[index].dateCompleted = Date(Date.now());
    }
    //console.log(posts[index]);
  }
  

  return (
    <div>
      <h3>{title}</h3>
      <div>{content}</div>
      <br />
      <i>Written by <b>{author}</b></i>
      <br />
      <i>Date Created: <b>{dateCreated}</b></i>
      <br />
      {check ? (
        <i>Date Complete: <b>{todos[index].dateCompleted}</b></i>
      ) : (
        <i>Date Complete: </i>
      )}
      <div>
        <input
          type="checkbox"
          checked={check} 
          onChange={handleComplete}
        />
        <label>Complete</label>
      </div>
    </div>
  );
}

