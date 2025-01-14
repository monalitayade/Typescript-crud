import React, { useState } from "react";
import "../../styles/main.css";

type AddTaskPopUpFormData = {
  taskId: number;
  taskname: string;
  taskdescription: string;
  taskstatus: string;
};

type MainPageProps = {
  showAddTaskPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTaskFlag: React.Dispatch<React.SetStateAction<boolean>>;
  taskList: AddTaskPopUpFormData[];
  setTaskList: React.Dispatch<React.SetStateAction<AddTaskPopUpFormData[]>>;
  setEditTaskList: React.Dispatch<
    React.SetStateAction<AddTaskPopUpFormData | null>
  >;
};

const MainPage: React.FC<MainPageProps> = ({
  showAddTaskPopUp,
  taskList,
  setTaskList,
  setEditTaskList,
  setEditTaskFlag,
}) => {
  const [tabName, setTabName] = useState<string>("All");

  const handleTabChange = (tabName: string) => {
    setTabName(tabName);
  };

  const handleChange = (id: number) => {
    console.log("handleChange -> index", id);

    const newTaskList = taskList?.map((task) => {
      if (task?.taskId === id) {
        return {
          ...task,
          taskstatus:
            task.taskstatus === "Incomplete" ? "Completed" : "Incomplete",
        };
      }
      return task;
    });

    setTaskList(newTaskList);
  };

  const deleteTaskId = (id: number) => {
    const newTaskList = taskList?.filter((task) => task.taskId !== id);
    setTaskList(newTaskList);
  };

  const editTaskId = (task: AddTaskPopUpFormData) => {
    console.log("editTaskId -> newTaskList", task);
    setEditTaskFlag(true);
    setEditTaskList(task);
    showAddTaskPopUp(true);
  };

  return (
    <div className="main_page">
      <h1 className="main_page__title">To Do App</h1>
      <p className="main_page__content">Enter yout to do task here.</p>
      <div className="todo-list-slot">
        <nav className="todo-list-slot__nav">
          <ul className="todo-list-slot__nav__list">
            <li className="todo-list-slot__nav__list__item">
              <button
                className="todo-list-slot__nav__link"
                onClick={() => handleTabChange("All")}>
                All
              </button>
            </li>
            <li className="todo-list-slot__nav__list__item">
              <button
                className="todo-list-slot__nav__link"
                onClick={() => handleTabChange("Completed")}>
                Completed
              </button>
            </li>
            <li className="todo-list-slot__nav__list__item">
              <button
                className="todo-list-slot__nav__link"
                onClick={() => handleTabChange("Incomplete")}>
                Incomplete
              </button>
            </li>
          </ul>
          <button
            className="todo-list__Add"
            onClick={() => showAddTaskPopUp(true)}>
            Add Task
          </button>
        </nav>
        <div className="todo-list-slot__list">
          {tabName === "All"
            ? taskList?.map((task, index) => {
                return (
                  <div className="todo-list-slot__list__item" key={index}>
                    <div className="check-wrap">
                      {/* <input
                        type="checkbox"
                        className="todo-list-slot__list__item__checkbox"
                      /> */}
                      <p className="todo-list-slot__list__item__content">
                        {task.taskname}
                      </p>
                      <div className="todo-list-slot__list__item__description">
                        {task.taskdescription}
                      </div>
                      <div className="todo-list-slot__list__item__status">
                        {task.taskstatus}
                      </div>
                    </div>
                    {task?.taskstatus === "Incomplete" && (
                      <button
                        className="delete__button"
                        onClick={() => editTaskId(task)}>
                        Edit
                      </button>
                    )}
                    {task?.taskstatus === "Incomplete" && (
                      <button className="delete__button">Delete</button>
                    )}
                  </div>
                );
              })
            : taskList
                ?.filter((task) => task.taskstatus === tabName)
                .map((task, index) => {
                  return (
                    <div className="todo-list-slot__list__item" key={index}>
                      <div className="check-wrap">
                        {task.taskstatus === "Incomplete" && (
                          <input
                            type="checkbox"
                            className="todo-list-slot__list__item__checkbox"
                            onChange={() => handleChange(task.taskId)}
                          />
                        )}
                        <p className="todo-list-slot__list__item__content">
                          {task.taskname}
                        </p>
                        <div className="todo-list-slot__list__item__description">
                          {task.taskdescription}
                        </div>
                        <div className="todo-list-slot__list__item__status">
                          {task.taskstatus}
                        </div>
                      </div>
                      {task?.taskstatus === "Incomplete" && (
                        <button
                          className="delete__button"
                          onClick={() => editTaskId(task)}>
                          Edit
                        </button>
                      )}
                      {task?.taskstatus === "Incomplete" && (
                        <button
                          className="delete__button"
                          onClick={() => deleteTaskId(task.taskId)}>
                          Delete
                        </button>
                      )}
                    </div>
                  );
                })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
