import * as React from 'react'
import { FC } from 'react'
import { UserWithBalanceAndId } from '../models/user'

type LayoutHeaderProps = {
  user: UserWithBalanceAndId
  rate: number | undefined
}

export const LayoutHeader: FC<LayoutHeaderProps> = props => (
  <div className="flex flex-col m-auto bg-cwhite-one items-center justify-center text-lg text-black font-thin mb-4">
    <div>Parking Place Booking</div>
    {props.user &&
      <div>
        <span>User Name: </span>
        <span className="text-cgreen-dark">{props.user.firstName} {props.user.lastName}</span>
        <span>  Apartment.No: </span>
        <span className="text-cgreen-dark">{props.user.apartment}</span>
      </div>
    }
    {props.user.balance &&
      <div>
        <span>Your Current Balance: </span>
        <span className="text-cgreen-dark">
          {props.user.balance} UAH
          {props.rate !== undefined && <span>({Math.floor(props.user.balance / props.rate)} days)</span>}
        </span>
      </div>
    }
  </div>
)
