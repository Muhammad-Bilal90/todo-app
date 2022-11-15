import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  
  function getTodos() {
    return fetch(`http://localhost:5000/`)
      .then(res => res.json())
      .then(res => {
        setData(res)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getTodos();
  }, []);

  // console.log(data);

  const submitTodo = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/addTodo`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value,
      }),
    })
      .then((res) => res.json())
      .then((res) => setData([...data, res]))
      .catch((error) => console.log(error));
    setValue("");
  }

  async function updateTodo(id){
    let newVal = prompt("Enter new value...", "");
    let indexVal = data.findIndex(x => x._id === id);
    console.log(indexVal);
    fetch(`http://localhost:5000/update/${id}`, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: newVal}),
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let newData = data.slice(0)
      newData.splice(indexVal,1, res);
      console.log(newData);
      setData(newData);
    })
    .catch((error) => console.log(error));


  }

  async function deleteTodo(id) {
    await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE"
    })
      .then(() => setData(data.filter((data) => data._id !== id)))
      .catch((error) => console.log(error));
  }

  return (
    <div className="App">
      <div className='todoContainer'>
        <h1>Todo App</h1>
          <form onSubmit={submitTodo}>
            <input className="input" type="text" value={value} onChange={(e) => setValue(e.target.value)} required />
            <button type="submit" className='buttons'>Add Todo</button>
          </form>
        <div className='listContainer'>
          {data && data.map(todo => {
            return (
              <li className='list' key={todo._id}>
                <span className='todoValue'>{todo.value}</span>
                <button className='buttons' onClick={() => { updateTodo(todo._id) }}>Edit</button>
                <button className='buttons' onClick={() => { deleteTodo(todo._id) }}>Delete</button>
              </li>
            )
          })}
        </div>  
      </div>  
    </div>
  );
}

export default App;