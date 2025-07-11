import { useState } from "react";
import Modal from "react-modal";
import ReactQuill from "react-quill";

import { type TaskAdderPopupProps } from "../../types/Components.types";
import "./TaskAdderPopup.styles.scss";
import { type Task } from "../../types/Tasks.types";
import "react-quill/dist/quill.snow.css";

const TaskAdderPopup = ({
  isVisible,
  setIsVisible,
  onSubmit,
  buttonName,
}: TaskAdderPopupProps) => {
  const [values, setValues] = useState<Task>({
    id: "",
    title: "",
    description: "",
    date: "",
    status: "To Do",
  });

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={closeModal}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[550px] border border-gray-300 bg-white overflow-scroll rounded-[15px] outline-none"
    >
      <div className="p-8 h-full flex flex-col">
        <label htmlFor="title" className="mb-2">
          Title:
        </label>
        <input
          name="title"
          className="mb-8 w-fit border-[1px] border-gray-400 rounded-md"
          defaultValue={values.title}
          onChange={(e) => {
            setValues({
              ...values,
              title: e.target.value,
            });
          }}
        />

        <label className="mb-2">Description:</label>
        <div className="pb-16 max-h-[250px] contents">
          <ReactQuill
            theme="snow"
            value={values.description}
            onChange={(value) => {
              setValues({
                ...values,
                description: value,
              });
            }}
            className="h-[250px] mb-16"
          />
        </div>
        <label htmlFor="date" className="mb-2">
          date:
        </label>
        <div>
          <input
            type="date"
            className="mb-8 w-fit border-[1px] border-gray-400 rounded-md"
            defaultValue={values.date}
            onChange={(e) => {
              setValues({
                ...values,
                date: e.target.value,
              });
            }}
          />
        </div>
        <label htmlFor="status" className="mb-2">
          status:
        </label>
        <div>
          <select
            className="mb-8 w-fit border-[1px] border-gray-400 rounded-md"
            defaultValue={values.status}
            onChange={(e) => {
              setValues({
                ...values,
                status: e.target.value,
              });
            }}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="primary-button mr-4 px-4 !h-12"
            onClick={() => {
              onSubmit(values);
              setValues({
                id: "",
                title: "",
                description: "",
                date: "",
                status: "To Do",
              });
              setIsVisible(false);
            }}
          >
            {buttonName}
          </button>
          <button
            className="secondary-button px-4 py-2 !h-12"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskAdderPopup;
