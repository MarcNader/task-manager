import {type Task} from './Tasks.types'

export type TaskBoxProps = {
  fields: Task
}

export interface TaskManagerPopup {
  buttonName: string
  isVisible: boolean
  setIsVisible: (isvisible: boolean) => void
  onSubmit: (values: Task) => void
}

export type TaskAdderPopupProps = TaskManagerPopup

export interface TaskEditorPopupProps extends TaskManagerPopup {
  defaultValues: Task
}

export type FilterProps = {
  applyFilter: (value: string) => void
  options: Array<{
    value: string
    text: string
  }>
  id: string
}

export type SorterProps = {
  sortBy: (value: string) => void
  options: Array<{
    value: string
    text: string
  }>
  id: string
}
