import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { FC } from 'react'
import { UserState } from '../models/user'

import budarinaParkingLogo from '../assets/budarinaParkingLogo.png'

type GeneralHeaderProps = {
  userState: UserState
  logOut: () => void
}

export const GeneralHeader: FC<GeneralHeaderProps> = props => {
  const linkClass = 'mx-4'
  return (
    <div className="w-full max-w-4xl bg-cwhite-one h-15 flex items-center justify-between mt-4 mb-2 mx-auto">

      <div className="flex w-1/3">
        {props.userState.type === 'Loaded' &&
          <>
            <div className={linkClass}>
              <NavLink to="/profile" activeClassName="is-active" exact={true}>Profile</NavLink>
            </div>

            <div className={linkClass}>
              <NavLink to="/booking" activeClassName="is-active" exact={true}>Booking</NavLink>
            </div>

            <div className={linkClass}>
              <NavLink to="/reports" activeClassName="is-active" exact={true}>Reports</NavLink>
            </div>
          </>
        }
      </div>

      <NavLink
        className="w-1/3 px-4"
        to="/">
        <img
          style={{
            height: '49px'
          }}
          alt="Budarina Parking logo"
          src={budarinaParkingLogo}
        />
      </NavLink>

      <div className="flex w-1/3">
        {props.userState.type === 'Initial'
          ? <>
            <div className={linkClass}>
              <NavLink to="/login" activeClassName="is-active" exact={true}>Log in</NavLink>
            </div>

            <div className={linkClass}>
              <NavLink to="/register" activeClassName="is-active" exact={true}>Register</NavLink>
            </div>
          </>
          :
          <div className={linkClass}>
            <a href="#" onClick={e => {
              e.preventDefault()
              props.logOut()
            }}>Log out</a>
          </div>
        }
      </div>

    </div>
  )
}
