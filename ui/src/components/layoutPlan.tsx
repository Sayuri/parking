import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { LayoutHeader } from './layoutHeader'
import { BookingConfirmationForm } from './bookingConfirmationForm'
import { DayPickerRange } from './dayPickerRange'
import * as backendService from '../services/backendService'
import { PlaceAvailability, sortPlaceAvailabilitiesByNumber } from '../models/availability'
import { UserWithBalanceAndId } from '../models/user'
import { renderParkingSpots, renderParkingSpotSpacer } from './parkingSpot'

import houseImage from '../assets/building.png'
import carIcon from '../assets/car.png'
import arrow2Icon from '../assets/arrow2.png'

type LayoutPlanProps = {
  user: UserWithBalanceAndId
  rate: number | undefined
}

export const LayoutPlan: FC<LayoutPlanProps> = props => {
  const [availability, setAvailability] = useState<Array<PlaceAvailability>>()
  const [selectedPlace, setSelectedPlace] = useState<number>()
  const [start, setStart] = useState<Date>()
  const [end, setEnd] = useState<Date>()

  useEffect(() => {
    updateAvailabilityStatusToday()
  }, [])

  const handleCloseBookingConfirmationForm = () => {
    updateAvailabilityStatusToday()
    setSelectedPlace(undefined)
  }

  const handleDayPickerInput = (newStart: Date | undefined, newEnd: Date | undefined) => {
    setStart(newStart)
    setEnd(newEnd)
    availabilityStatusDatesRange(newStart, newEnd)
  }

  const updateAvailabilityStatusToday = async () => {
    const availabilityData = await backendService.availabilityStatusToday()
    const availabilityDataSorted = sortPlaceAvailabilitiesByNumber(availabilityData)
    setAvailability(availabilityDataSorted)
  }

  const availabilityStatusDatesRange = async (fromDate: Date | undefined, toDate: Date | undefined) => {
    const availabilityData = await backendService.availabilityStatusRange({fromDate, toDate})
    const availabilityDataSorted = sortPlaceAvailabilitiesByNumber(availabilityData)
    setAvailability(availabilityDataSorted)
  }

  if (!availability || !availability.length || !props.rate) {
    return <div>Loading...</div>
  }

  const renderPlaces = renderParkingSpots({availability, setSelectedPlace})

  const renderLegend = () => {
    const imageClass = 'w-3 h-3 border-black border mr-2'
    const rowClass = 'flex items-center'
    return (
      <div className="text-sm font-thin text-black">
        <div className={rowClass}>
          <div className={imageClass} style={{background: '#FFD0D3'}}/>
          <div>Taken</div>
        </div>
        <div className={rowClass}>
          <div className={imageClass} style={{background: '#B5FCE9'}}/>
          <div>Available</div>
        </div>
        <div className={rowClass}>
          <div className={imageClass} style={{background: '#FCEBC9'}}/>
          <div>Out of service</div>
        </div>
        <div className={rowClass}>
          <div className={imageClass} style={{background: '#0075FA'}}/>
          <div>Reserved</div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: '900px',
      }}
      className="flex flex-col items-center justify-center mx-auto">
      <LayoutHeader user={props.user} rate={props.rate}/>
      <div style={{borderRadius: '20px'}} className="border-cgreen-light border p-4 overflow-hidden bg-white">
        <div className="mb-8">
          <DayPickerRange onSubmit={handleDayPickerInput}/>
        </div>
        <div className="flex justify-end h-28 mb-12">
          <div className="flex">
            {renderPlaces([34, 33, 32, 31, 30], 'slanted')}
          </div>
          {renderParkingSpotSpacer()}
          <div className="flex">
            {renderPlaces([29, 28, 27, 26, 25, 24], 'slanted')}
          </div>
          {renderParkingSpotSpacer()}
        </div>

        <div className="grid grid-cols-6">
          <div>
            {renderPlaces([39, 40, 41, 42, 43, 44, 45, 46])}
          </div>

          <div className="col-span-2">
            <div className="flex">
              {renderPlaces([38, 37, 36, 35], 'top')}
            </div>

            <div>
              <img alt="House" src={houseImage} className=""/>
            </div>

          </div>

          <div>
            <div className="">
              {renderPlaces([23, 22])}
            </div>
            <div className="">
              {renderPlaces([21, 20, 19, 18])}
            </div>
          </div>

          <div>
            <img alt="Arrow" src={arrow2Icon} className="image-arrow2"/>
            <p>
              {false /* TODO */
                ? <img alt="Animated parking car" src={carIcon} className="image-car-animation"/>
                : ''
              }
            </p>
          </div>

          <div className="flex flex-col ml-auto">
            {renderPlaces([17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])}
          </div>
        </div>
        <div className="text-left">
          <p className="font-bold">Parking place availability {end === undefined ? ' as of TODAY' : ''}</p>
          <p className="text-sm mb-4">
            {end === undefined
              ? 'Please select a date range to book'
              : ' on the selected dates'}
          </p>
          {renderLegend()}
        </div>
      </div>

      {selectedPlace && start && end &&
      <BookingConfirmationForm
        user={props.user}
        rate={props.rate}
        selectedPlace={selectedPlace}
        startDate={start}
        endDate={end}
        onClose={handleCloseBookingConfirmationForm}
      />
      }

    </div>
  )
}
