import axios from 'axios'

const URL = 'https://task-manager-116de-default-rtdb.europe-west1.firebasedatabase.app/'

export const StoreUserData = async (data: any, userId: string) => {
  try {
    console.log('the data i am about to send', data)

    data.userId = userId
    // data.acessToken = user.accessToken
    window.localStorage.setItem('isLoggedIn', JSON.stringify(true))

    const response = await axios.post(URL + '/Users.json', data)
    console.log('the stored data', response)

    return response
  } catch (error) {
    alert(error)
  }
}

export const FetchUserData = async (userId: string) => {
  // const fieldUrl = `${URL}${'/Users'}/${userId}.json`
  const response = await axios.get(URL + '/Users.json')
  console.log('fetched response', response)

  for (const key in response.data) {
    if (userId === response.data[key].userId) {
      return response.data[key]
    }
  }

  alert('no user data found!')
}
