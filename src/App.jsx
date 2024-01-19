import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import {useState} from "react";
import {nanoid} from "nanoid";


function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompeted(id) {
    const updateList = tasks.map(t => {
      if (t.id === id) {
        // 可以这样更新对象
        return {...t, completed: !t.completed}
      }

      return t;
    })

    setTasks(updateList)
  }

  function editTask(id, newName) {
    console.log(id, newName);
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newName };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTasks(editedTaskList);
  }


  const taskList = tasks?.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompeted={toggleTaskCompeted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remaining = tasks.filter(t => t.id !== id)

    setTasks(remaining);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
