import { Task } from "../types/Tasks.types";
import dayjs from "dayjs";
export const useFilters = (
  tasks: Task[],
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  const applyDateFilter = (value: string) => {
    const today = dayjs();
    const filteredData = tasks?.filter((item) => {
      const itemDate = dayjs(item.date);
      switch (value) {
        case "none":
          return true;
        case "today":
          return itemDate.isSame(today, "day");
        case "thisWeek":
          return itemDate.isSame(today, "week");
        case "thisMonth":
          return itemDate.isSame(today, "month");
        default:
          return false;
      }
    });
    setFilteredTasks(filteredData);
  };

  const applyStatusFilter = (value: string) => {
    const filteredData =
      value === "none" ? tasks : tasks?.filter((item) => item.status === value);
    setFilteredTasks(filteredData);
  };

  const sortBy = (value: string) => {
    if (value === "none") return;
    const sortedTasks = [...(tasks ?? [])].sort((a, b) => {
      const dateA = dayjs(a.date);
      const dateB = dayjs(b.date);
      return value === "dateAscending" ? dateA.diff(dateB) : dateB.diff(dateA);
    });
    setFilteredTasks(sortedTasks);
  };

  return { applyDateFilter, applyStatusFilter, sortBy };
};
