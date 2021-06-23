import * as React from 'react'
import { FC } from 'react'
import { differenceInDays } from 'date-fns'
import { Button } from './button'
import { PopupWindow } from './popupWindow'
import { UserWithBalanceAndId } from '../models/user'
import { BookingParams } from '../models/bookingParams'
import * as backendService from '../services/backendService'

import calendarIcon from '../assets/calendar.png'
import parkingIcon from '../assets/parkingPictogram.png'
import moneyIcon from '../assets/moneyPictogram.png'
import closeIcon from '../assets/closePictogram.png'

interface BookingConfirmFormProps {
  user: UserWithBalanceAndId
  rate: number
  selectedPlace: number
  startDate: Date
  endDate: Date
  onClose: () => void
}

export const BookingConfirmationForm: FC<BookingConfirmFormProps> = props => {
  const numberOfDays = differenceInDays(props.endDate, props.startDate)

  const totalPayableAmount = props.rate * numberOfDays

  const submitBookingDataToDatabase = async () => {
    const body: BookingParams = {
      spotId: props.selectedPlace,
      startDate: props.startDate.toISOString().split('T')[0], // TODO: use a library to parse date
      endDate: props.endDate.toISOString().split('T')[0], // TODO: use a library to parse date
      userId: props.user.id
    }

    const bookingSubmitConfirmation = await backendService.addBooking(body)
    const bookingConfirmation = Object.getOwnPropertyNames(bookingSubmitConfirmation)

    bookingSubmitConfirmation
      ? alert('Requested booking done with: ' + bookingConfirmation) // TODO: add message details
      : alert('Please try again')

    props.onClose()
    window.location.reload() // TODO
  }

  const fieldClass = 'mb-4'
  const labelClass = 'font-bold text-sm mb-2'

  return (
    <PopupWindow
      isOpen={true}
      onClose={props.onClose}
      title="Booking Confirmation"
      modalClassName="mx-auto flex flex-col items-center justify-center py-4 px-10 rounded-lg border border-cgray-one bg-white"
      styles={{
        content: {
          marginTop: '20vh',
          width: '600px',
        }
      }}
    >
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Parking Booking Confirmation</h2>
        <img alt="Close" src={closeIcon} className="w-4 h-4 cursor-pointer" onClick={props.onClose}/>
      </div>

      <div className="w-full grid grid-cols-2 mb-4">
        <div className={fieldClass}>
          <div className={labelClass}>First Name</div>
          <div className="">{props.user.firstName}</div>
        </div>

        <div className={fieldClass}>
          <div className={labelClass}>Last Name</div>
          <div className="">{props.user.lastName}</div>
        </div>

        <div className={fieldClass + ' col-span-2'}>
          <div className={labelClass}>Selected Place</div>
          <div className="flex items-center">
            <img alt="Parking place" src={parkingIcon} className="mr-2 w-6 h-6"/>
            <div className="font-bold text-xl mb-1">{props.selectedPlace}</div>
          </div>
        </div>

        <div className={fieldClass}>
          <div className={labelClass}>Date From</div>
          <div className="flex">
            <img alt="Calendar" src={calendarIcon} className="mr-2"/>
            <div className="input-box-data">
              {props.startDate.toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className={fieldClass}>
          <div className={labelClass}>Date To (Inclusive)</div>
          <div className="flex">
            <img alt="Calendar" src={calendarIcon} className="mr-2"/>
            <div className="">
              {props.endDate.toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className={fieldClass}>
          <div className={labelClass}>Number of Days</div>
          <div className="input-box-data">{numberOfDays}</div>
        </div>

        <div className={fieldClass}>
          <div className={labelClass}>Rate Per Day</div>
          <div className="input-box-data">{props.rate} UAH</div>
        </div>

        <div className={fieldClass}>
          <div className={labelClass}>Current Balance</div>
          <div className="flex">
            <img alt="Balance" src={moneyIcon} className="mr-2"/>
            <span className="input-box-data">{props.user.balance} UAH</span>
          </div>
        </div>

        <div className={fieldClass}>
          <div className={labelClass}>Total Payable Amount</div>
          <div className="flex">
            <img alt="Payable amount" src={moneyIcon} className="mr-2"/>
            <span className="input-box-data">{totalPayableAmount} UAH</span>
          </div>
        </div>
      </div>
      <Button
        onClick={submitBookingDataToDatabase}
        text="Confirm reservation"
      />
    </PopupWindow>
  )
}
