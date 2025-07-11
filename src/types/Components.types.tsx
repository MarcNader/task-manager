import { RefObject } from "react";
import { type Task } from "./Tasks.types";

export type TaskBoxProps = {
  fields: Task;
};

export interface TaskManagerPopup {
  buttonName: string;
  isVisible: boolean;
  setIsVisible: (isvisible: boolean) => void;
  onSubmit: (values: Task) => void;
}

export type TaskAdderPopupProps = TaskManagerPopup;

export interface TaskEditorPopupProps extends TaskManagerPopup {
  defaultValues: Task;
}

export type FilterProps = {
  applyFilter: (value: string) => void;
  options: Array<{
    value: string;
    text: string;
  }>;
  id: string;
  customStyle?: string;
};

export type SorterProps = {
  sortBy: (value: string) => void;
  options: Array<{
    value: string;
    text: string;
  }>;
  id: string;
};

export type SideBarProps = {
  fromNavBar?: string;
};

export interface DropdownProps {
  isVisible: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  iconRef: RefObject<HTMLImageElement>;
}
