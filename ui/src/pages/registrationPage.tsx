import * as React from 'react'
import styled from 'styled-components'
import * as backendService from '../services/backendService'
import { RegistrationPayload } from '../models/registrationPayload'
import { FC, useState } from 'react'
import { NewCar } from '../../../api/dist/dto/newCar.dto'
import { emptyUser, User } from '../models/user'

import city2 from '../assets/illustration_BC.png'
import { Button } from '../components/button'

const RegistrationPageBase = styled.div`
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

  .registration-page-central-container {
    background-color: #ffffff;
    border-radius: 10px;
    border-style: solid;
    border-color: #BAEBB8;
    border-width: 1px;
    display: flex;
    flex-direction: column;
    width: 642px;
    height:auto;
    margin: 32px 0px 120px 0px;
    padding: 0px 64px;
  }

  .registration-page-header {
    font-size: 30px;
    text-align: center;
    padding: 20px 20px 20px 20px;
  }

  .input-general-container {
    display: flex;
    flex-direction: column;
  }

  .input-block-two-halfwide{
    display: flex;
    flex-direction: row;
  }

  .input-block-halfwide{
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .input-box {
    width: auto;
    height: 50px;
    padding: 8px;
    border-radius: 10px;
    border-style: solid;
    border-color: #BAEBB8;
    border-width: 1px;
    font-size: 18px;
  }

  .input-box-halfwide-left{
    width: 250px;
    margin: 0px 11px 0px 0px;
  }

  .input-box-halfwide-right{
    margin: 0px 0px 0px 11px;
  }
  .input-box-tittle {
    width:auto;
    height:auto;
    padding-top: 17px;
    padding-bottom: 15px;
    font-family: "Raleway";
    font-style: SemiBold;
    font-size: 18px;
    text-align: left;
    color: black;
  }

  .input-box-tittle-right {
    padding-left: 11px;
  }

  .registration-checkbox {
    width: 25px;
    height: 25px;
    background-color: #ffffff;
    align-items: left;
    margin: 30px 0px;
  }

  .label {
    padding-left: 10px;
    font-size: 18px;
  }
`

export const RegistrationPage: FC = () => {
  const [newUser, setNewUser] = useState<RegistrationPayload>({user: emptyUser, password: ''})
  const [confirmDirty, setConfirmDirty] = useState(false)
  const [passwordConfirmed, setPasswordConfirmed] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const submitNewUserToDatabase = async () => {
    backendService.addNewUser(newUser)
      .catch(() => alert('Please try again'))
    // TODO: go to logged in page
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    termsAccepted
      ? submitNewUserToDatabase()
      : window.confirm('Please read and accept Terms and Conditions')
  }

  const handlePasswordChange =  (event: React.FormEvent<HTMLInputElement>) => {
    setNewUser({...newUser, password: event.currentTarget.value})
  }

  const handleUserChange = (fieldName: keyof User) => (event: React.FormEvent<HTMLInputElement>) => {
    setNewUser({...newUser, user: {...newUser.user, [fieldName]: event.currentTarget.value}})
  }

  const handleCarChange = (fieldName: keyof NewCar) => (event: React.FormEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      user: {
        ...newUser.user,
        car: {...newUser.user.car, [fieldName]: event.currentTarget.value}
      }
    })
  }

  const handlePasswordConfirmation = (event: React.FormEvent<HTMLInputElement>) => {
    const confirmedPassword: string = event.currentTarget.value
    if (confirmedPassword === newUser.password) {
      setPasswordConfirmed(true)
    }
  }

  return (
    <RegistrationPageBase>
      <div className="image-city"/>
      <div className="registration-page-central-container">

        <div className="registration-page-header">
          <div>Register at Budarina 3G</div>
          <div>Parking Booking System</div>
        </div>

        <div className="input-general-container">
          <div className="input-block-two-halfwide">
            <div className="input-block-halfwide">
              <div className="input-box-tittle">First Name</div>
              <input className="input-box input-box-halfwide-left" onChange={handleUserChange('firstName')}/>
            </div>
            <div className="input-block-halfwide">
              <div className="input-box-tittle input-box-tittle-right">Last Name</div>
              <input className="input-box input-box-halfwide-right" onChange={handleUserChange('lastName')}/>
            </div>
          </div>

          <div className="input-box-tittle">Appartment #</div>
          <input className="input-box" onChange={handleUserChange('apartment')}/>
          <div className="input-box-tittle">Phone</div>
          <input className="input-box" onChange={handleUserChange('phone')}/>
          <div className="input-box-tittle">Email</div>
          <input className="input-box" onChange={handleUserChange('email')}/>
          <div className="input-box-tittle">Car registration number</div>
          <input className="input-box" onChange={handleCarChange('number')}/>

          <div className="input-block-two-halfwide">
            <div className="input-block-halfwide">
              <div className="input-box-tittle">Car brand</div>
              <input className="input-box input-box-halfwide-left" onChange={handleCarChange('brand')}/>
            </div>
            <div className="input-block-halfwide">
              <div className="input-box-tittle input-box-tittle-right">Car model</div>
              <input className="input-box input-box-halfwide-right" onChange={handleCarChange('model')}/>
            </div>
          </div>

          <div className="input-box-tittle">Password</div>
          <input className="input-box" type="password" onChange={handlePasswordChange}/>
          <div className="input-box-tittle">Confirm Password</div>
          <input className="input-box" type="password" onChange={handlePasswordConfirmation}/>

          <div className="flex items-center justify-center">
            <input className="registration-checkbox"
                   type="checkbox"
                   checked={termsAccepted}
                   onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label className="label">I accept the terms and conditions</label>
          </div>

        </div>
        <Button
          className="mb-8"
          onClick={handleSubmit}
          text="Get Started Now"
        />
      </div>

    </RegistrationPageBase>
  )
}
