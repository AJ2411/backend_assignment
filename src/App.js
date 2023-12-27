import axios from 'axios';
import React, { useState, useEffect } from 'react';
import download from "./images/download.png"
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [isModalOpen, setModalOpen] = useState(false);
  const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")
  const [id, setId] = useState()

const getTasks = () => {
  axios.get('http://localhost:4000/tasks')
  .then((data) =>{
console.log("Data==>", data)
    setTasks(data.data)
  })
  .catch((error) => console.error('Error fetching tasks:', error));
}

  useEffect(() => {
    getTasks()
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = () => {
    fetch('http://localhost:4000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })

    // axios.post("http://localhost:4000/tasks", newTask, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
      .then((response) => response.json())
      .then((data) =>{

       setTasks([...tasks, data])
      setNewTask({
        title:"",
        description:""
      })
      getTasks()
      })
      .catch((error) => console.error('Error adding task:', error));
  };
  const handleEdit  = (task) => {
    setModalOpen(true);
    setTitle(task.title)
    setDescription(task.description)
    setId(task.id)
console.log("Task==>" , task)
  }
  const handleDelete  = async (task) => {
    console.log("Task==>" , task)
 await axios.delete(`http://localhost:4000/tasks/${task.id}`)
 getTasks()
      }
      const handleCloseModal = () => {
        // Close the modal
        setModalOpen(false);
      };

     const  handleEditTodo = async () => {
      const todo = {
        id,
        title,description
      }
      await axios.put(`http://localhost:4000/tasks/${id}`,todo )
      .then((res) => {
        console.log("res", res)
        getTasks()
        alert("edited succesfully")
      
      }).catch((err) => {
        console.log("Error", err)
        alert ("Not Edited ")
      })
     }



      const handleTitle = (e) => {
setTitle(e.target.value)
      }
      const handledescription = (e) => {
        setDescription(e.target.value)
              }
  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        { tasks && tasks.map((task,i) => (
          // <li key={task.id}>{task.title}</li>
          <table key={i} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center', border: '1px solid #ddd' }}>
          <tr style={{ border: '1px solid #ddd' }}>
            <th style={{ border: '1px solid #ddd' }}>Sr No</th>
            <th style={{ border: '1px solid #ddd' }}>ToDo</th>
            <th style={{ border: '1px solid #ddd' }}>Description</th>
            <th style={{ border: '1px solid #ddd' }}>Action</th>
          </tr>
          <tr style={{ border: '1px solid #ddd' }}>
            <td style={{ border: '1px solid #ddd' }}>{i + 1}</td>
            <td style={{ border: '1px solid #ddd' }}>{task.title}</td>
            <td style={{ border: '1px solid #ddd' }}>{task.description}</td>
            <td style={{ border: '1px solid #ddd' }}>
              <button style={{ border: 'none', padding: '5px 10px', cursor: 'pointer' }} onClick={() => handleEdit(task)}>Edit</button>
              <button style={{ border: 'none', padding: '5px 10px', cursor: 'pointer' }} onClick={() => handleDelete(task)}>Delete</button>
            </td>
          </tr>
        </table>


        ))}
        {/* { open} */}
        {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 999,
          }}
        >
<div style={{display:"flex", justifyContent:"space-between"}}> 
<h2> 
  Edit ToDo
  </h2>
  <img
  src={download}
  alt="Close Icon"
  style={{ height: '50px', width: '50px' }}
  onClick={handleCloseModal}
/>

  </div>  

  <hr/>
<label>Title:</label>
<input
  type='text'
  value={title}
  onChange={(e) => handleTitle(e)}
  style={{ margin: '10px', padding: '4px' }}
/><br/><label>Description:</label>

<input
  type='text'
  value={description}
  onChange={(e) => handledescription(e)}
  style={{ margin: '10px', padding: '4px' }}
/><br/>  <button onClick={handleEditTodo}> Edit TODo</button>
        </div>)
}
      </ul>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Task description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default App;
