import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

import {type UserState} from '../types/Store.types'
import {type User} from '../types/User.types'

const initialState: UserState = {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  user: {} as User
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload as User
    }
  }
})

export const {setUser} = authSlice.actions

export default authSlice.reducer
