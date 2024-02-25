import {configureStore} from '@reduxjs/toolkit'

import authSlice from './Authentication'

export const store = configureStore({
  reducer: {
    authentication: authSlice
  }
})

export type MainState = ReturnType<typeof store.getState>
