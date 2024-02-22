import {type User} from './User.types'

export type AuthState = {
  isLoggedIn: boolean
//   language: LanguageCode | null
}

export type UserState = {
  user: User
}
