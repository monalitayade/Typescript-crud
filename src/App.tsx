import { useState } from "react";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import AddTaskPopUp from "./components/AddTaskPopUp/AddTaskPopUp";

function App() {
  const [showAddTaskPopUp, setShowAddTaskPopUp] = useState<boolean>(false);
  const [editTaskFlag, setEditTaskFlag] = useState<boolean>(false);

  type AddTaskPopUpFormData = {
    taskId: number;
    taskname: string;
    taskdescription: string;
    taskstatus: string;
  };

  const [taskList, setTaskList] = useState<AddTaskPopUpFormData[]>([
    {
      taskId: 101,
      taskname: "Task 1",
      taskdescription: "Task 1 description",
      taskstatus: "Incomplete",
    },
    {
      taskId: 202,
      taskname: "Task 2",
      taskdescription: "Task 2 description",
      taskstatus: "Completed",
    },
    {
      taskId: 303,
      taskname: "Task 3",
      taskdescription: "Task 3 description",
      taskstatus: "Incomplete",
    },
  ]);

  const [editTaskList, setEditTaskList] = useState<AddTaskPopUpFormData | null>(
    null
  );

  console.log("editTaskList 42", editTaskList, editTaskFlag);

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>TS + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <h1>TS + React</h1> */}
      <MainPage
        showAddTaskPopUp={setShowAddTaskPopUp}
        taskList={taskList}
        setTaskList={setTaskList}
        setEditTaskList={setEditTaskList}
        setEditTaskFlag={setEditTaskFlag}
      />
      {showAddTaskPopUp && (
        <AddTaskPopUp
          setShowAddTaskPopUp={setShowAddTaskPopUp}
          setTaskList={setTaskList}
          editTaskList={editTaskList}
          editTaskFlag={editTaskFlag}
          setEditTaskFlag={setEditTaskFlag}
        />
      )}
    </>
  );
}

export default App;
