import { useRef, useState } from "react";
import TaskEditorPopup from "../TaskEditorPopup/TaskEditorPopup";
import Overlay from "../Overlay/Overlay";
import { type TaskBoxProps } from "../../types/Components.types";
import { type Task } from "../../types/Tasks.types";
import DropdownMenu from "../DropDownMenu.tsx/DropDownMenu.tsx";
import { getStatusColor } from "../../helpers/getStatus/statusUtils.ts";
import DueDateIcon from "../../assets/icons/due-date.png";
import { useTasks } from "../../hooks/useTasks.ts";
const TaskBox: React.FC<TaskBoxProps> = ({ fields }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const iconRef = useRef<HTMLImageElement>(null);
  const { TriggerDeleteTask, TriggerEditTask, isLoading } = useTasks(fields);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };
  const openEditor = () => {
    setEditorVisible(true);
    setDropdownVisible(false);
  };

  const handleDelete = async () => {
    setDropdownVisible(false);
    TriggerDeleteTask(fields);
  };

  const handleSave = (values: Task) => {
    if (!values.title.trim() || !values.description.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }

    TriggerEditTask(values);
    setEditorVisible(false);
  };

  return (
    <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1rem)] bg-white p-4 relative rounded-[15px] dark:bg-dark-900 dark:text-dark-50">
      <Overlay isVisible={isLoading} />
      <TaskEditorPopup
        defaultValues={fields}
        buttonName="Edit"
        isVisible={isEditorVisible}
        setIsVisible={setEditorVisible}
        onSubmit={handleSave}
      />
      <DropdownMenu
        isVisible={isDropdownVisible}
        onEdit={openEditor}
        onDelete={handleDelete}
        onClose={() => setDropdownVisible(false)}
        iconRef={iconRef}
      />
      <div
        ref={iconRef}
        className="justify-self-end cursor-pointer"
        onClick={toggleDropdown}
      >
        ...
      </div>
      <h3>{fields.title}</h3>
      <div
        className="h-[100px] overflow-scroll text-ellipsis line-clamp-4 font-[arial]"
        dangerouslySetInnerHTML={{ __html: fields.description }}
      ></div>
      <div className="flex mt-3">
        <span className="font-bold">Due Date:</span>
        <span className="ml-2 font-[arial] flex items-center">
          {fields.date}
          <img src={DueDateIcon} className="w-[20px] ml-2" />
        </span>
      </div>
      <div className="pt-2 flex">
        <span className="font-bold">Status:</span>
        <span className={getStatusColor(fields.status)}>{fields.status}</span>
      </div>
    </div>
  );
};

export default TaskBox;
