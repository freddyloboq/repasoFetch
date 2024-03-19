import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [ task, setTask ] = useState({})
  const [todos, setTodos] = useState([])

  useEffect(()=>{
    const fetchData = async() => {
      const getTodos = await fetchingTodo(
        "https://playground.4geeks.com/apis/fake/todos/user/freddyloboq",
        "GET"
      );
      setTodos(getTodos);
    }
    fetchData();
  },[])
    // console.log('todos', todos)

  const fetchingTodo = async (url, method, body) => {
    // fetch(url).then().then().catch()
    const option1 = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const option2 = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      }
    };

    const finalOption = method == 'GET' ? option2 : option1

    try{
      const response = await fetch(url, finalOption);

      if(!response.ok){
        throw new Error("Status error in Fetch")
      }

      const data = await response.json()
      // console.log("data", data);
      return data;

    }catch(error){
      console.log('error', error)
    }
  }

  const handleClick = () => {
    fetchingTodo(
      "https://playground.4geeks.com/apis/fake/todos/user/freddyloboq",
      "POST",
      []
    );
  }

  const handleChange = (e) => {
    setTask({
      label: e.target.value,
      done: false
    })
    console.log('task', task)
  }

  const handleKeyDown = (e) =>{
    if(e.key === 'Enter'){
      const newTodos = [...todos, task];
      setTodos(newTodos);
      fetchingTodo(
        "https://playground.4geeks.com/apis/fake/todos/user/freddyloboq",
        "PUT",
        newTodos
      );
      setTask({label: ""});
    }
  }

  return (
    <>
      <h1>Mi Todo list</h1>
      <button onClick={handleClick} className="d-block">
        Crear usuario
      </button>

      {/* onChange */}
      {/* onKeyDown */}
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={task.label}
        type="text"
        className="d-block"
        name="addTodos"
        placeholder="Agregar las tareas"
      />

      <section>
        <ul>
          {Array.isArray(todos)
            ? todos?.map((todo) => {
                return <li key={todo.id}>{todo.label}</li>;
              })
            : "No hay tareas"}
        </ul>
      </section>
    </>
  );
}

export default App