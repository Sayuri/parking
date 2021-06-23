import { LoginDto, LoginResultDto, User, UserWithBalanceAndId } from '../models/user'
import { BookingParams } from '../models/bookingParams'
import { DateRangeParams } from '../models/dateRangeParams'
import { RegistrationPayload } from '../models/registrationPayload'
import { PlaceAvailability } from '../models/availability'

const apiUrl = 'http://localhost:5050'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

const makeHeaders = () => {
  const token = localStorage.getItem('budarina_token')
  return token
    ? {...defaultHeaders, 'Budarina-Token': token}
    : defaultHeaders
}

const fetchUrl = async (url: string, method: 'GET' | 'POST' | 'DELETE' = 'GET', body?: object) => {
  const requestOptions = {
    method,
    headers: makeHeaders(),
    body: (!body || method === 'GET' || method === 'DELETE') ? null : JSON.stringify(body),
  }

  const response = await fetch(url, requestOptions)
  if (response.status === 404) {
    return {notFound: true}
  }
  if (response.status !== 200 && response.status !== 201) { // TODO: improve status code validation
    throw new Error('Server error.')
  }
  return response.json()
}

export const logIn = (payload: LoginDto): Promise<LoginResultDto> => fetchUrl(`${apiUrl}/user/login`, 'POST', payload)

export const getMe = (): Promise<UserWithBalanceAndId> => fetchUrl(`${apiUrl}/user/me`)

export const addNewUser = (params: RegistrationPayload): Promise<{}> => fetchUrl(`${apiUrl}/user`, 'POST', params)

export const addBooking = (params: BookingParams): Promise<{}> => fetchUrl(`${apiUrl}/`, 'POST', params)

export const availabilityStatusToday = (): Promise<Array<PlaceAvailability>> => fetchUrl(`${apiUrl}/`)

export const availabilityStatusRange = (params: DateRangeParams): Promise<Array<PlaceAvailability>> =>
  fetchUrl(`${apiUrl}/?start=${params.fromDate}&end=${params.toDate}`)

export const getRate = (): Promise<number> => fetchUrl(`${apiUrl}/rate`)
