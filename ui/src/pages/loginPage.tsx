import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FC, useState } from 'react'
import { Button } from '../components/button'

import city2 from '../assets/illustration_BC.png'

const LoginFormBase = styled.div`
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  vertical-align: center;
  justify-content: center;
  font-family: "Raleway";
  font-style: SemiBold;
  color: black;
  background: url(${city2}) no-repeat;
  background-position: 50% 100%;

  .login-page-header {
    font-size: 35px;
    text-align: center;
    padding-top: 50px;
  }

  .header-welcome {
    color: black;
  }

  .header-budarina-parking  {
    color: #0EC795;
  }

  .login-page-central-container {
    background-color: #ffffff;
    border-radius: 10px;
    border-style: solid;
    border-color: #BAEBB8;
    border-width: 1px;
    display: flex;
    flex-direction: column;
    width: 618px;
    height: 616px;
    margin: 60px 0px 120px 0px;
    padding: 0px 50px;
  }

  .central-container-header {
    width: auto;
    height: 92px;
    font-size: 30px;
    text-align: center;
    padding-top: 50px;
  }

  .input-general-container {
    display: flex;
    flex-direction: column;
  }

  .input-box {
    width: 520px;
    height: 60px;
    padding: 8px;
    font-size: 20px;
    border-radius: 10px;
    border-style: solid;
    border-color: #BAEBB8;
    border-width: 1px;
  }

  .input-box-tittle {
    width:auto;
    height:auto;
    line-height: 65px;
    font-size: 18px;
    text-align: left;
    color: black;
  }

  .block-with-two-halfwide-blocks{
    display: flex;
    flex-direction: row;
  }

  .block-halfwide{
    display: flex;
    flex-direction: row;
    width: 50%;
  }
  .login-checkbox {
    width: 22px;
    height: 22px;
    background-color: #ffffff;
    align-items: left;
    margin: 40px 0px;
  }

  .label {
    padding-left: 10px;
    font-size: 18px;
    line-height: 98px;
  }
`

interface LoginPageProps {
  authError: boolean
  logIn: (email: string, password: string) => void
}

export const LoginPage: FC<LoginPageProps> = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    props.logIn(username, password)
  }

  return (
    <LoginFormBase>
      <div className="image-city"/>

      <div className="login-page-header">
        <span className="header-welcome">Welcome to</span>
        <span className="header-budarina-parking"> Budarina 3G Parking</span>
      </div>

      <div className="login-page-central-container">

        <div className="central-container-header">
          <div>Login</div>
        </div>

        <div className="input-general-container mb-4">

          <div className="input-box-tittle">Email</div>
          <input className="input-box" onChange={e => setUsername(e.target.value)}/>

          <div className="input-box-tittle">Password</div>
          <input className="input-box" type="password" onChange={e => setPassword(e.target.value)}/>

        </div>

        {props.authError &&
          <div className="text-red-400">
            Authentication failed. Please try again.
          </div>
        }

        <Button
          className="mt-4"
          onClick={handleSubmit}
          text="Log in"
        />

        <div className="flex justify-between">
          <NavLink
            to="/register"
            className="input-box-tittle create-profile"
            activeClassName="is-active"
            exact={true}>
            Create profile?
          </NavLink>

          <NavLink
            to="/passwordRecovery"
            className="input-box-tittle forgot-password"
            activeClassName="is-active"
            exact={true}>
            Forgot password?
          </NavLink>
        </div>

      </div>

    </LoginFormBase>
  )
}
