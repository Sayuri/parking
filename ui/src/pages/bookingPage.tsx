import * as React from 'react'
import { FC } from 'react'
import { LayoutPlan } from '../components/layoutPlan'
import { CityImage } from '../components/cityImage'
import { UserWithBalanceAndId } from '../models/user'

type BookingPageProps = {
  user: UserWithBalanceAndId
  rate: number | undefined
}

export const BookingPage: FC<BookingPageProps> = props => {
  return (
    <div className="bg-cwhite-one w-full text-center flex flex-col items-center justify-center">
      <CityImage>
        <LayoutPlan user={props.user} rate={props.rate}/>
      </CityImage>

      <div className="5bg-cgreen-darker w-full h-14 text-white mt-8">
        <p> Terms and conditions</p>
      </div>
    </div>
  )
}
