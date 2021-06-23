import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { UserState } from '../models/user'
import city2 from '../assets/illustration_BC.png'
import { Button, NavButton } from '../components/button'

const PasswordRecoveryFormBase = styled.div`
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center
  vertical-align: center;
  justify-content: center;
  font-family: "Raleway";
  font-style: SemiBold;
  color: black;
  background: url(${city2}) no-repeat;
  background-position: 50% 100%;

  .password-recovery-page-header {
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

  .password-recovery-page-central-container {
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
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    color: red;
  }

  .message {
    width:auto;
    height:auto;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    color: black;
  }

  .options {
    width:auto;
    height:50px;
    color: #1C376B;
    vertical-align: center;
  }

  .options-left {
    text-align: left;
    width:50%;
  }

  .options-right {
    text-align: right;
    justify-content: right;
  }

`

type PasswordRecoveryPageProps = {
  user: UserState
}

export const PasswordRecoveryPage: FC<PasswordRecoveryPageProps> = props => {

  // const handleSubmit = (event: React.SyntheticEvent) => {
  //   event.preventDefault()
  //   return props.user !== null && (console.log(props.user.lastName))
  // }

  return (
    <PasswordRecoveryFormBase>
      <div className="image-city"/>

      <div className="password-recovery-page-header">
        <span className="header-welcome">Forgot Password?</span>
      </div>

      <div className="password-recovery-page-central-container">
        <div className="central-container-header">
          <div>Recover your password</div>
        </div>

        <div className="input-general-container">
          <div className="input-box-tittle">Please enter the email address you registered with</div>
          <div className="message">We will email you a temporary password for login</div>
          <input className="input-box"/>
          <Button
            // onClick={handleSubmit}
            text="Request a temporary password"
          />
        </div>

        <div className="input-general-container">
          <div className="input-box-tittle">Please enter the temporary password received at your email</div>
          <input className="input-box"/>
        </div>

        <NavButton
          to="/login"
          activeClassName="is-active"
          exact={true}
          text="Login with temporary password"
        />

        <div className="flex">
          <NavButton
            to="/passwordReset"
            className="input-box-tittle options options-left"
            activeClassName="is-active"
            exact={true}
            text="Reset my password"
          />

          <NavButton
            to="/login"
            className="input-box-tittle options options-right"
            activeClassName="is-active"
            exact={true}
            text="Return to Login Page"
          />
        </div>

      </div>

    </PasswordRecoveryFormBase>
  )
}
