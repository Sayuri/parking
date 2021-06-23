import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import city2 from '../assets/illustration_BC.png'
import { UserState } from '../models/user'
import { FC } from 'react'
import { NavButton } from '../components/button'

const PasswordResetFormBase = styled.div`
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

  .password-reset-page-header {
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

  .password-reset-page-central-container {
    background-color: #ffffff;
    border-radius: 10px;
    border-style: solid;
    border-color: #BAEBB8;
    border-width: 1px;
    display: flex;
    flex-direction: column;
    width: 618px;
    height: auto;
    margin: 60px 0px 120px 0px;
    padding: 30px 50px;
  }

  .central-container-header {
    width: auto;
    height: 92px;
    font-size: 30px;
    text-align: center;
    padding-top: 20px;
  }

  .input-general-container {
    display: flex;
    flex-direction: column;
  }

  .input-box {
    width: 520px;
    height: 60px;
    border-radius: 10px;
    border-style: solid;
    border-color: #BAEBB8;
    border-width: 1px;
  }

  .input-box-tittle {
    width:auto;
    height:auto;
    line-height: 60px;
    font-size: 18px;
    text-align: center;
    color: black;
  }

  .options-container {
    display: flex;
    flex-direction: row;
  }

  .options {
    width:auto;
    height:50px;
    color: #1C376B;
    vertical-align: center;
  }

`

type PasswordResetPageProps = {
  user: UserState
}

export const PasswordResetPage: FC<PasswordResetPageProps> = props => {

  // const handleSubmit = (event: React.SyntheticEvent) => {
  //   event.preventDefault()
  //   return props.user !== null && (console.log(props.user.lastName))
  // }

  return (
    <PasswordResetFormBase>
      <div className="password-reset-page-header">
        <span className="header-welcome">Password Reset</span>
      </div>

      <div className="password-reset-page-central-container">
        <div className="central-container-header">
          <div>Reset your password</div>
        </div>

        <div className="input-general-container">
          <div className="input-box-tittle">Please enter your old password</div>
          <input className="input-box"/>
        </div>

        <div className="input-general-container">
          <div className="input-box-tittle">Please enter your new password</div>
          <input className="input-box"/>
        </div>

        <div className="input-general-container">
          <div className="input-box-tittle">Please confirm your new password</div>
          <input className="input-box"/>
        </div>

        <NavButton
          to="/login"
          activeClassName="is-active"
          exact={true}
          text="Reset my password"
        />

        <div className="options-container">
          <NavLink
            to="/login"
            className="input-box-tittle options"
            activeClassName="is-active"
            exact={true}>
            Return to Login Page
          </NavLink>
        </div>
      </div>

    </PasswordResetFormBase>
  )
}
