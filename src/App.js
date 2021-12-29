import React, { useState } from 'react'
import { isEmpty, size } from 'lodash'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)


  const validForm = () => {
    let isValid = true
    setError(null)

    if (isEmpty(task)) {
      setError("You must entry a Task")
      isValid = false
    }

    return isValid
  }

  const addTask = (e) => {
    e.preventDefault();

    if (!validForm()) {
      return
    }
    console.log("sd")

    const newTask = {
      id: shortid.generate(),
      name: task
    }

    setTasks([...tasks, newTask])
    setTask("")
  }

  const saveTask = (e) => {
    e.preventDefault();

    if (!validForm()) {
      return
    }

    const editedTasks = tasks.map(item => item.id === id ? { id, name: task } : item)

    setEditMode(false)
    setId("")
    setTask("")
    setTasks(editedTasks)
  }

  const deleteTask = id => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const editTask = theTask => {
    setEditMode(true)
    setId(theTask.id)
    setTask(theTask.name)
  }

  return (
    <div className="container mt-5">
      <h1>Tasks</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Tasks List</h4>
          {
            size(tasks) == 0
              ? (<li className="list-group-item">No Tasks found.</li>)
              : (
                <ul className="list-group">
                  {
                    tasks.map((task) => (
                      <li className="list-group-item" key={task.id}>
                        <span className="lead">{task.name}</span>
                        <button
                          className="btn btn-warning btn-sm float-right mx-2"
                          onClick={() => editTask(task)}>
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm float-right"
                          onClick={() => deleteTask(task.id)}>
                          Delete
                        </button>
                      </li>
                    ))
                  }
                </ul>
              )
          }
        </div>
        <div className="col-4">
          {
            <>
              <h4 className="text-center">{editMode ? "Edit Task" : "Add Task"}</h4>
              <form onSubmit={editMode ? saveTask : addTask}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Type the task here"
                  onChange={(text) => setTask(text.target.value)}
                  value={task}
                />
                {
                  error && <span className='text-danger'>{error}<br /></span>
                }
                <button
                  className={
                    editMode ? "btn btn-warning btn-sm btn-block" : "btn btn-dark btn-sm btn-block"}
                  type="submit">
                  {editMode ? "Save" : "Add"}
                </button>
              </form>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
