import axios from 'axios'

const URL = 'https://task-manager-116de-default-rtdb.europe-west1.firebasedatabase.app/'

export const StoreUserData = async (data: any, userId: string) => {
  try {
    data.userId = userId
    window.localStorage.setItem('user', userId)

    const response = await axios.post(URL + '/Users.json', data)

    return response
  } catch (error: any) {
    alert(error.message)
  }
}

export const FetchUserData = async (userId: string) => {
  try {
    const response = await axios.get(URL + '/Users.json')

    for (const key in response.data) {
      if (userId === response.data[key].userId) {
        return response.data[key]
      }
    }
  } catch (error: any) {
    alert(error.message)
  }
}
