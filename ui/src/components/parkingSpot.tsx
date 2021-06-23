import * as React from 'react'
import car from '../assets/car.png'
import { PlaceAvailability } from '../models/availability'

type ParkingSpotProps = {
  availability: Array<PlaceAvailability>
  setSelectedPlace: (place: number) => void
}

export const renderParkingSpots = (props: ParkingSpotProps) => (placeNumbers: Array<number>, layout?: 'top' | 'slanted') => {
  return placeNumbers.map(place => renderParkingSpot(props)(place, layout))
}

export const renderParkingSpot = (props: ParkingSpotProps) => (placeNumber: number, layout?: 'top' | 'slanted') => {
  const placeCurrentStatus: string = props.availability[placeNumber - 1].status
  return (
    <div key={placeNumber}
         style={{...getPlaceStatusStyle(placeCurrentStatus), ...getPlaceLayoutStyle(layout)}}
         className="w-24 h-8 rounded text-black cursor-pointer my-1 relative"
         onClick={() => props.setSelectedPlace(placeNumber)}>
      <span>{placeNumber}</span>
      {placeCurrentStatus === 'booked' && <img alt="Car" src={car} className="w-10 h-6 mx-1 absolute top-0 mt-1"/>}
    </div>
  )
}

export const renderParkingSpotSpacer = () =>
  <div style={{width: '80px'}} className="" />

const getPlaceStatusStyle = (placeStatus: string) => {
  switch (placeStatus) {
    case 'free': return {background: '#c4faea'}
    case 'booked': return {background: '#fcd2d4'}
    case 'reserved': return {background: '#1a75f1'}
    case 'out': return {background: 'yellow'}
  }
}

const getPlaceLayoutStyle = (layout?: string) => {
  switch (layout) {
    case 'top': return {
      transform: 'rotate(270deg)',
      margin: '0px -28px'
    }
    case 'slanted': return {
      transform: 'rotate(290deg)',
      margin: '30px -27px 0 -27px'
    }
    default: return {}
  }
}
