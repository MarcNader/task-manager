import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

// import {type LanguageCode} from '../types/Components.types'
import {type AuthState} from '../types/Store.types'

const initialState: AuthState = {
  isLoggedIn: false
//   language: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    }
    // setLanguage: (state, action: PayloadAction<LanguageCode | null>) => {
    //   state.language = action.payload
    // }
  }
})

export const {setIsLoggedIn} = authSlice.actions

export default authSlice.reducer
