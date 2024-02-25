import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

import {type AuthState} from '../types/Store.types'

const initialState: AuthState = {
  userId: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    }
  }
})

export const {setUserId} = authSlice.actions

export default authSlice.reducer
