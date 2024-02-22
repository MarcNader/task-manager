import {type FormEvent, useState} from 'react'
import {NavLink, Navigate} from 'react-router-dom'
import {GoogleLoginButton} from 'react-social-login-buttons'

import {signInWithGooglePopup, signinAuthUserWithEmailAndPassword} from '../../utils/firebaseConfig'
import './SignIn.scss'

const SignIn = () => {
  const defaultFormField = {
    email: '',
    password: ''
  }

  const [formFields, setFormFields] = useState(defaultFormField)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const HanldeChange = (event: {target: {name: any, value: any}}) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
  }

  const Handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await signinAuthUserWithEmailAndPassword(formFields.email, formFields.password)
    response && setIsLoggedIn(true)
  }

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    response && setIsLoggedIn(true)
  }

  const InputFields = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'example@gmail.com'
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: 'test1234'
    }
  ]

  return (
    <div className="signin">
      <div className="signin-body">
        <h2>Welcome to TaskRabbit!</h2>
        <div className="signin-form-container">
          <div className="google-container">
            <GoogleLoginButton className="google" onClick={logGoogleUser}>Sign in with Google</GoogleLoginButton>
          </div>
          <span>Or</span>
          {isLoggedIn && (
            <Navigate to="/" replace={true}/>
          )}
          <form onSubmit={Handlesubmit} >
            {InputFields.map((field, index) => {
              return (
                <div key={index} className='input-field'>
                  <label style={{textAlign: 'left'}}>{field.label}</label>
                  <input
                    type={field.type}
                    required
                    onChange={HanldeChange}
                    name={field.name}
                    placeholder={field.placeholder}
                  />
                </div>
              )
            })
            }
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>Don't have an account?
              <NavLink to={'/SignUp'} className="Link">
                Sign Up
              </NavLink>
            </p>
            <div className='button-container'>
              <button className="submit-button text-light" type="submit" >Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn