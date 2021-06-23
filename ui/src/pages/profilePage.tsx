import * as React from 'react'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { emptyUser, User, UserWithBalanceAndId } from '../models/user'

import city2 from '../assets/illustration_BC.png'
import photo from '../assets/marinaDeoli.png'
import edit from '../assets/edit.png'

const ProfilePageBase = styled.div`
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

  .profile-page-central-container {
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
    padding: 0px 64px 30px 64px;
  }

  .input-general-container {
    display: flex;
    flex-direction: column;
  }

  .profile-header {
    font-size: 30px;
   	text-align: center;
    padding: 10px 10px 10px 60px;
  }

  .edit-button-box{
  	width:44px;
    height:44px;
    display:inline-block;
    background: #f1f6ff;
    border-radius: 2px;
    position: relative;
    left:215px;
    align-items: center
    vertical-align: center;
    justify-content: center;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    border-color: #BAEBB8;
  }
  .edit-button{
  	width:22px;
    height:22px;
  }

  .customer-photo-frame{
	width: 214px;
    height: 214px;
	border-style: solid;
    border-width: 1px;
    border-color: #2ab87e;
    border-top-left-radius:50%;
  	border-bottom-left-radius: 50%;
  	border-top-right-radius: 50%;
  	border-bottom-right-radius: 50%;
  	padding: 8px;
  	display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .customer-photo{
    width: 196px;
    height: 196px;
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
    border-radius: 10px;
    border-style: solid;
    border-color: #BAEBB8;
    border-width: 1px;
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

  .reset-password {
    text-align: right;
  }
`

interface ProfilePageProps {
  user: UserWithBalanceAndId
  rate: number | undefined
  onSave: (user: User) => void
}

export const ProfilePage: FC<ProfilePageProps> = props => {
  const [userDraft, setUserDraft] = useState<User>(emptyUser)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!userDraft) return
    props.onSave(userDraft)
  }

  const handleChange = (fieldName: keyof User) => (event: React.FormEvent<HTMLInputElement>) => {
    setUserDraft({...userDraft, [fieldName]: event.currentTarget.value})
  }

  return (
    <ProfilePageBase>
      <div className="image-city"/>
      <div className="profile-page-central-container">

        <div className="profile-header">
          <span>Profile</span>
          <span className="edit-button-box">
                <img alt="Save edits" src={edit} className="edit-button" onClick={handleSubmit}/>
              </span>
        </div>

        <div className="customer-photo-frame"><img src={photo} className="customer-photo"/></div>
        <div className="input-general-container">

          <div className="input-block-two-halfwide">
            <div className="input-block-halfwide">
              <div className="input-box-tittle">First Name</div>
              <input className="input-box input-box-halfwide-left" onChange={handleChange('firstName')}/>
            </div>
            <div className="input-block-halfwide">
              <div className="input-box-tittle input-box-tittle-right">Last Name</div>
              <input className="input-box input-box-halfwide-right" onChange={handleChange('lastName')}/>
            </div>
          </div>

          <div className="input-box-tittle">Address</div>
          <input className="input-box" onChange={handleChange('apartment')}/>
          <div className="input-box-tittle">Phone</div>
          <input className="input-box" onChange={handleChange('phone')}/>
          <div className="input-box-tittle">Email</div>
          <input className="input-box" onChange={handleChange('email')}/>
          {/* <div className="input-box-tittle">Car registration number</div>
              <input className="input-box" onChange={handleChange('carRegNumber')} /> */}

          <div className="input-block-two-halfwide">
            <div className="input-block-halfwide">
              <div className="input-box-tittle">Car brand</div>
              <input className="input-box input-box-halfwide-left" onChange={handleChange('firstName')}/>
            </div>
            <div className="input-block-halfwide">
              <div className="input-box-tittle input-box-tittle-right">Car model</div>
              <input className="input-box input-box-halfwide-right" onChange={handleChange('lastName')}/>
            </div>
          </div>

          <div className="input-block-two-halfwide">
            <div className="input-block-halfwide">
              <div className="input-box-tittle">My current balance: 100 UAH</div>
            </div>
            <div className="input-block-halfwide">
              <NavLink
                to="/passwordReset"
                className="input-box-tittle reset-password"
                activeClassName="is-active"
                exact={true}>
                Reset my password
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </ProfilePageBase>
  )
}
