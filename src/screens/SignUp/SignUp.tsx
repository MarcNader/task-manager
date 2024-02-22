import {type FormEvent, useState} from 'react'
import {NavLink, Navigate} from 'react-router-dom'

import './SignUp.scss'
import {StoreUserData} from '../../api/https'
import {type UserCredentials} from '../../types/User.types'
import {createAuthUserWithEmailAndPassword} from '../../utils/firebaseConfig'

const SignUp = () => {
  const defaultFormField: UserCredentials = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  const [formFields, setFormFields] = useState<UserCredentials>(defaultFormField)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const {email, password} = formFields

  const HanldeChange = (event: {target: {name: any, value: any}}) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
  }

  const Handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await createAuthUserWithEmailAndPassword(email, password)
    const {user} = response
    await StoreUserData(formFields, user.uid as string)

    user && setIsLoggedIn(true)
  }

  const InputFields = [
    {
      label: 'First Name',
      type: 'text',
      name: 'firstName'
    },
    {
      label: 'Last Name',
      type: 'text',
      name: 'lastName'
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email'
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password'
    }
  ]

  return (
    <div className="signup-container">
      <div className="signup-body">
        <h2>Get Started</h2>
        <p>
          Already have an account?
          <NavLink
            to={'/SignIn'}
            className="Link">
            Sign in
          </NavLink>
        </p>
        <div className="form-container">
          {isLoggedIn && (
          <Navigate to="/" replace={true}/>
          )}
          <form onSubmit={Handlesubmit}>
            {InputFields.map((field, index) => {
              return (
                <div key={index} className='input-field'>
                  <label style={{textAlign: 'left'}}>{field.label}</label>
                  <input
                    type={field.type}
                    required
                    onChange={HanldeChange}
                    name={field.name}
                  />
                </div>
              )
            })
            }
            <div className='button-container'>
              <button className="submit-button" type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>)
}

export default SignUp
