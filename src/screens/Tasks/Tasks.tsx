import { Drawer } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FilterIcon from "../../assets/icons/filter.png";
import Filter from "../../components/Filter/Filter";
import Sorter from "../../components/Sorter/Sorter";
import TaskAdderPopup from "../../components/TaskAdderPopup/TaskAdderPopup";
import TaskBox from "../../components/TaskBox/TaskBox";
import Overlay from "../../components/Overlay/Overlay";
import { useTasks } from "../../hooks/useTasks";
import { useFilters } from "../../hooks/useFilters";
import { MainState } from "../../store/Store";
import { Task } from "../../types/Tasks.types";

const Tasks = () => {
  const tasks = useSelector((state: MainState) => state.tasksData.tasks);
  const { isLoading, TriggerCreateTask } = useTasks();

  const [isVisible, setIsVisible] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const { applyDateFilter, applyStatusFilter, sortBy } = useFilters(
    tasks,
    setFilteredTasks
  );

  const onAddClicked = () => setIsVisible(true);
  const showDrawer = () => setOpenDrawer(true);
  const closeDrawer = () => setOpenDrawer(false);

  const dateOptions = [
    { value: "none", text: "Select Date:" },
    { value: "today", text: "Today" },
    { value: "thisWeek", text: "This Week" },
    { value: "thisMonth", text: "This Month" },
  ];

  const statusOptions = [
    { value: "none", text: "Select Status:" },
    { value: "To Do", text: "To Do" },
    { value: "In Progress", text: "In Progress" },
    { value: "Done", text: "Done" },
  ];

  const sortingOptions = [
    { value: "none", text: "Sort By:" },
    { value: "dateAscending", text: "Date - Ascending" },
    { value: "dateDescending", text: "Date - Descending" },
  ];

  return (
    <div className="h-full p-4 overflow-scroll bg-[#f7f7f7] rounded-md dark:bg-dark-400">
      <Overlay isVisible={isLoading} />
      <TaskAdderPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        buttonName="Create"
        onSubmit={TriggerCreateTask}
      />
      <Drawer open={openDrawer} onClose={closeDrawer} anchor="right">
        <div className="flex flex-col p-8">
          <h2 className="font-system">Filters</h2>
          <Filter
            applyFilter={applyDateFilter}
            options={dateOptions}
            id="date"
            customStyle="mb-5"
          />
          <label>Status Filter:</label>
          <Filter
            applyFilter={applyStatusFilter}
            options={statusOptions}
            id="status"
          />
        </div>
      </Drawer>
      <div className="border-b border-gray-300 shadow-md rounded-lg py-1 px-4 flex justify-between items-center dark:bg-dark-800">
        <div className="flex">
          <div
            className="flex items-center cursor-pointer hover:text-black/50"
            onClick={showDrawer}
          >
            <span>
              <label className="text-black dark:text-dark-50">Filter</label>
            </span>
            <img
              src={FilterIcon}
              width="15px"
              style={{ marginInline: "5px" }}
            />
          </div>
          <Sorter id="sorting" options={sortingOptions} sortBy={sortBy} />
        </div>
        <button
          className="primary-button h-[2.3em] w-[6em] rounded-lg border border-solid  text-white hover:cursor-pointer dark:text-dark-50 dark:bg-dark-600 "
          onClick={onAddClicked}
        >
          Add
        </button>
      </div>
      {filteredTasks.length > 0 && (
        <div className="flex flex-wrap gap-5 mt-4">
          {filteredTasks.map((task, id) => (
            <TaskBox fields={task} key={task.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
