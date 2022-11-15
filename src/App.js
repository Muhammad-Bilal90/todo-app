import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  let inputVal = useRef();

   function getTodos() {
    return fetch(`http://localhost:5000/`)
      .then(res => res.json())
      .then(res => {
        setData(res)
      })
      .catch((error) => {
        console.log(error);
      });

      // return todoData;
  }

  useEffect(() => {
    getTodos();
  }, []);

  console.log(data);

  const submitTodo = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/addTodo`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 100),
        value: inputVal.current.value,
      }),
    })
      .then((res)=>{
        // console.log('res: ', res);
      return  getTodos();
      })
      .catch((err) => console.log(err));

  }


 function deleteTodo(id){
    // e.preventDefault();
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE"
    })
      .then((res)=> res.json())
      .then(res => {
        console.log("res :", res)
        setData(res);
      })
      .catch((err) => console.log(err.message));

  }
  
  return (
    <div className="App">
      <form onSubmit={submitTodo}>
        <input type="text" ref={inputVal} required />
        <button type="submit">Add Todo</button>
      </form>
      {data && data.map(todo => {
        return (
          <li key={todo.id}>{todo.value} <button onClick={() => {deleteTodo(todo.id)}}>Delete</button></li>
        )
      })}
    </div>
  );
}

export default App;