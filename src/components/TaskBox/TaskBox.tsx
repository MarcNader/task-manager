import './TaskBox.styles.scss'
import {useState} from 'react'

import {deleteTask, editTask} from '../../api/tasksData'
import DeleteIcon from '../../assets/delete.png'
import DueDateIcon from '../../assets/due-date.png'
import EditIcon from '../../assets/edit.png'
import {type TaskBoxProps} from '../../types/Components.types'
import 'react-quill/dist/quill.snow.css'
import {type Task} from '../../types/Tasks.types'
import TaskEditorPopup from '../TaskEditorPopup/TaskEditorPopup'

const TaskBox = ({fields}: TaskBoxProps) => {
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const showOptions = () => {
    setOptionsVisible(!optionsVisible)
  }

  const onEditClicked = () => {
    setIsVisible(true)
    setOptionsVisible(false)
  }

  const onDeleteClicked = async () => {
    setOptionsVisible(false)
    await deleteTask(fields.id)
    window.location.reload()
  }

  const onSave = async (values: Task) => {
    if (values.title === '') {
      alert('title is a required field, cannot be left empty')

      return
    }

    if (values.description === '') {
      alert('Description is a required field, cannot be left empty')

      return
    }

    await editTask(values.id, values)
    setIsVisible(false)
    window.location.reload()
  }

  const statusColor = fields.status === 'To Do'
    ? 'footer-field-value todo-color'
    : fields.status === 'In Progress'
      ? 'footer-field-value inprogress-color'
      : 'footer-field-value done-color'

  return (
    <div className='taskbox-container'>
      <TaskEditorPopup
        defaultValues={fields}
        buttonName='Edit'
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onSubmit={async (values: Task) => {await onSave(values)}}
      />
      <div
        className={optionsVisible
          ? 'options-box visible'
          : 'options-box'}>
        <div onClick={onEditClicked}>
          <img src={EditIcon} className='icon'/>
          Edit
        </div>
        <div onClick={onDeleteClicked}>
          <img src={DeleteIcon}className='icon'/>
          delete
        </div>
      </div>
      <div id='options' onClick={showOptions}>...</div>
      <h3>{fields.title}</h3>
      <div
        className='description'
        dangerouslySetInnerHTML={{__html: fields.description}}>
      </div>
      <div className='footer-container'>
        <span className='footer-field-key'>Due Date:</span>
        <span className='footer-field-value'>
          {fields.date}
          <img src={DueDateIcon} className='duedate-icon'/>
        </span>
      </div>
      <div className='footer-container'>
        <span className='footer-field-key'>Status:</span>
        <span className={statusColor}>{fields.status}</span>
      </div>
    </div>)
}

export default TaskBox
