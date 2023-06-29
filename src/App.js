import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import { useState, useEffect } from "react";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() =>{
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }
  
//delete task
const deleteTask = async (id) =>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE',
  })
  setTasks(tasks.filter((task)=> task.id !== id))
}
//reminder toggle
const toggleReminder = (id) =>{
  setTasks(tasks.map((task) => task.id === id ? { ...task, reminder : !task.reminder} : task))
}
//add tasks
const addTask = async (task) =>{
  const res = await fetch('http://localhost:5000/tasks',{
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])
}
  return (
    <div className="container">
      <Header onAdd={()=>{setShowAddTask(!showAddTask)
      }} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd = {addTask}/>}
      {tasks.length > 0 ? <Tasks tasks ={tasks} 
        onDelete ={deleteTask} 
        onToggle = {toggleReminder}/> :
       ('No tasks to show')}
    </div>
  );
}

export default App;
