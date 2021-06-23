import { sortBy } from 'ramda'

export type PlaceAvailability = {
  number: number,
  status: string
}

export const sortPlaceAvailabilitiesByNumber = sortBy<PlaceAvailability>(p => p.number)
