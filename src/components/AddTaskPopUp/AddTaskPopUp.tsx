import React, { useEffect, useState } from "react";
import "../AddTaskPopUp/AddTaskPopUp.css";

type AddTaskPopUpFormData = {
  taskId: number;
  taskname: string;
  taskdescription: string;
  taskstatus: string;
};

type AddTaskPopUpProps = {
  setShowAddTaskPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskList: React.Dispatch<React.SetStateAction<AddTaskPopUpFormData[]>>;
  editTaskList: AddTaskPopUpFormData | null;
  editTaskFlag: boolean;
  setEditTaskFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTaskPopUp: React.FC<AddTaskPopUpProps> = ({
  setShowAddTaskPopUp,
  setTaskList,
  editTaskList,
  editTaskFlag,
  setEditTaskFlag,
}) => {
  const [formData, setFormData] = useState<AddTaskPopUpFormData>({
    taskId: Math.floor(Math.random() * 1000),
    taskname: "",
    taskdescription: "",
    taskstatus: "Incomplete",
  });

  console.log("editTaskList", editTaskList, editTaskFlag);

  useEffect(() => {
    if (editTaskFlag && editTaskList) {
      setFormData(editTaskList);
    } else {
      setFormData({
        taskId: Math.floor(Math.random() * 1000),
        taskname: "",
        taskdescription: "",
        taskstatus: "Incomplete",
      });
    }
  }, [editTaskFlag, editTaskList]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const AddTaskFormData = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTaskFlag) {
      // Update existing task
      setTaskList((prevList) =>
        prevList.map((task) =>
          task.taskId === formData.taskId ? { ...formData } : task
        )
      );
    } else {
      // Add new task
      setTaskList((prevList) => [...prevList, { ...formData }]);
    }

    setShowAddTaskPopUp(false);
  };

  return (
    <div className="addtaskpopup__content">
      <div className="addtaskpopup__content__wrapper">
        <div className="addtaskpopup__content__header">
          <h1 className="addtaskpopup__content__header__title">Add Task</h1>
          <button
            className="addtaskpopup__content__header__close"
            onClick={() => {
              setShowAddTaskPopUp(false), setEditTaskFlag(false);
            }}>
            X
          </button>
        </div>
        <form className="addtaskpopup__content__form">
          <div className="addtaskpopup__content__form__row">
            <label
              className="addtaskpopup__content_form__row__label"
              htmlFor="taskname">
              Task Name
            </label>
            <input
              type="text"
              id="taskname"
              name="taskname"
              value={formData.taskname}
              className="addtaskpopup__content_form__row__input"
              onChange={onChange}
            />
          </div>
          <div className="addtaskpopup__content__form__row">
            <label
              className="addtaskpopup__content_form__row__label"
              htmlFor="taskdescription">
              Task Description
            </label>
            <input
              type="text"
              id="taskdescription"
              value={formData.taskdescription}
              name="taskdescription"
              className="addtaskpopup__content_form__row__input"
              onChange={onChange}
            />
          </div>
          <button
            type="button" // Change to "button" to prevent form submission
            className="addtaskpopup__content__form__submit"
            onClick={AddTaskFormData}>
            {editTaskFlag ? "Save Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopUp;
