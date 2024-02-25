import axios from 'axios'

import {type Task} from '../types/Tasks.types'

const URL = 'https://task-manager-116de-default-rtdb.europe-west1.firebasedatabase.app/'

export const createTask = async (data: any, userId: string) => {
  try {
    data.userId = userId

    const response = await axios.post(URL + '/Tasks.json', data)

    return response
  } catch (error: any) {
    alert(error.message)
  }
}

export const getTasks = async (userId: string) => {
  try {
    const response = await axios.get(URL + '/Tasks.json')
    const tasks = []

    for (const key in response.data) {
      if (userId === response.data[key].userId) {
        // delete response.data[key].userId
        response.data[key].id = key
        tasks.push(response.data[key])
      }
    }

    return tasks
  } catch (error: any) {
    alert(error.message)
  }
}

export const editTask = async (taskId: string, data: Task) => {
  try {
    await axios.put(URL + `/Tasks/${taskId}.json`, data)
  } catch (error: any) {
    alert(error.message)
  }
}

export const deleteTask = async (taskId: string) => {
  try {
    await axios.delete(URL + `/Tasks/${taskId}.json`)
  } catch (error: any) {
    alert(error.message)
  }
}
