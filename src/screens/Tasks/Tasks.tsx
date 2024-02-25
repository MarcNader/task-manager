import {Drawer} from '@mui/material'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {createTask, getTasks} from '../../api/tasksData'
import FilterIcon from '../../assets/filter.png'
import Filter from '../../components/Filter/Filter'
import Sorter from '../../components/Sorter/Sorter'
import TaskAdderPopup from '../../components/TaskAdderPopup/TaskAdderPopup'
import TaskBox from '../../components/TaskBox/TaskBox'
import {type MainState} from '../../store/Store'
import {type Task} from '../../types/Tasks.types'
import './Tasks.styles.scss'

const Tasks = () => {
  const userID = useSelector((state: MainState) => state.authentication.userId)
  const [tasks, setTasks] = useState<Task[]>()
  const [filteredTasks, setFilteredTasks] = useState<Task[]>()
  const [isVisible, setIsVisible] = useState(false)
  const [status, setStatus] = useState('')
  const [openDrawer, setopenDrawer] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTasks(userID)
      setTasks(response)
      setFilteredTasks(response)
    }

    void fetchData()
  }, [])

  const onAddClicked = () => {
    setIsVisible(true)
  }

  const addTask = async (values: Task) => {
    if (values.title === '') {
      alert('title is a required field, cannot be left empty')

      return
    }

    if (values.description === '') {
      alert('Description is a required field, cannot be left empty')

      return
    }

    await createTask(values, userID)
    setIsVisible(false)
    window.location.reload()
  }

  const applyDateFilter = (value: string) => {
    const today = moment()

    const filteredData = tasks?.filter((item) => {
      const itemDate = moment(item.date)
      switch (value) {
        case 'none':
          return item
        case 'today':
          return itemDate.isSame(today, 'day')
        case 'thisWeek':
          return itemDate.isSame(today, 'week')
        case 'thisMonth':
          return itemDate.isSame(today, 'month')
        default:
          return false
      }
    })
    setFilteredTasks(filteredData)
  }

  const applyStatusFilter = (value: string) => {
    if (value === 'none') {
      setFilteredTasks(tasks)
      setStatus(value)

      return
    }

    const filteredData = tasks?.filter((item) => (item.status === value))
    setStatus(value)
    setFilteredTasks(filteredData)
  }

  const sortBy = (value: string) => {
    if (value === 'none') return

    const sortedTasks = [...(filteredTasks ?? [])].sort((item1, item2) => {
      const moment1 = moment(item1.date)
      const moment2 = moment(item2.date)

      return (value === 'dateAscending'
        ? moment1.diff(moment2)
        : moment2.diff(moment1))
    })
    setFilteredTasks(sortedTasks)
  }

  const dateOptions = [
    {
      value: 'none',
      text: 'Select Date:'
    },
    {
      value: 'today',
      text: 'Today'
    },
    {
      value: 'thisWeek',
      text: 'This Week'
    },
    {
      value: 'thisMonth',
      text: 'This Month'
    }
  ]

  const statusOptions = [
    {
      value: 'none',
      text: 'Select Status:'
    },
    {
      value: 'To Do',
      text: 'To Do'
    },
    {
      value: 'In Progress',
      text: 'In Progress'
    },
    {
      value: 'Done',
      text: 'Done'
    }
  ]

  const sortingOptions = [
    {
      value: 'none',
      text: 'Sort By:'
    },
    {
      value: 'dateAscending',
      text: 'Date - Ascending'
    },
    {
      value: 'dateDescending',
      text: 'Date - Descending'
    }

  ]

  const showDrawer = () => {
    setopenDrawer(true)
  }

  const CloseDrawer = () => {
    setopenDrawer(false)
  }

  return (
    <div className='tasks-container'>
      <Drawer
        open={openDrawer}
        onClose={CloseDrawer}
        anchor='right'>
        <div className='filters-container'>
          <h2>Filters</h2>
          <div>
            <label>Date Filter:</label>
            <Filter
              applyFilter={(value) => {applyDateFilter(value)}}
              options={dateOptions}
              id='date'
            />
          </div>
          <div id='status-filter'>
            <label>Status Filter:</label>
            <Filter
              applyFilter={(value) => {applyStatusFilter(value)}}
              options={statusOptions}
              id='status'
            />
          </div>
        </div>
      </Drawer>
      <TaskAdderPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        buttonName='Create'
        onSubmit={async (values: Task) => {await addTask(values)}}
      />
      <div className='header'>
        <div className='first-section'>
          <div className='filters-button' onClick={showDrawer}>
            <span><strong>Filter</strong></span>
            <img
              src={FilterIcon}
              width={'15px'}
              style={{width: '15px', marginInline: '5px'}}
            />
          </div>
          <Sorter
            id='sorting'
            options={sortingOptions}
            sortBy={sortBy}
          />
        </div>
        <div>
        </div>
        <button className='add-button' onClick={onAddClicked}>
          Add
        </button>
      </div>
      {status && status !== 'none' && <h2 className='section-header'>{status}</h2>}
      <div className='todo-list'>
        {
         filteredTasks?.map((task) => (
           <TaskBox
             fields={task}
             key={task.id}
           />
         ))
        }
      </div>
    </div>
  )
}

export default Tasks
