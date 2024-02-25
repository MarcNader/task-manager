import {useState} from 'react'
import Modal from 'react-modal'
import ReactQuill from 'react-quill'

import {type TaskAdderPopupProps} from '../../types/Components.types'
import './TaskAdderPopup.styles.scss'
import {type Task} from '../../types/Tasks.types'

const TaskAdderPopup = ({isVisible, setIsVisible, onSubmit, buttonName}: TaskAdderPopupProps) => {
  const [values, setValues] = useState<Task>({
    id: '',
    title: '',
    description: '',
    date: '',
    status: 'To Do'
  })

  const closeModal = () => {
    setIsVisible(false)
  }

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={closeModal}
      className='custom-Adder-modal'>
      <div className='task-add-container'>
        <label htmlFor='title'>Title:</label>
        <input
          name='title'
          defaultValue={values.title}
          onChange={(e) => {
            setValues({
              ...values,
              title: e.target.value
            })
          }}
        />
        <label>Description:</label>
        <div className='quill-container'>
          <ReactQuill
            theme="snow"
            value={values.description}
            onChange={(value) => {
              setValues({
                ...values,
                description: value
              })
            }}
            className='popup-add-quill'
          />
        </div>
        <label htmlFor='date'>date:</label>
        <div>
          <input
            type='date'
            defaultValue={values.date}
            onChange={(e) => {
              setValues({
                ...values,
                date: e.target.value
              })
            }}
          />
        </div>
        <label htmlFor='status'>status:</label>
        <div>
          <select
            defaultValue={values.status}
            onChange={(e) => {
              setValues({
                ...values,
                status: e.target.value
              })
            }}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className='popup-buttons-container'>
          <button
            className='button'
            onClick={() => {onSubmit(values)}}>{buttonName}
          </button>
          <button className='button cancel-button' onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </Modal>
  )
}

export default TaskAdderPopup
