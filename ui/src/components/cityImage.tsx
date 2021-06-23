import { FC } from 'react'

import city1 from '../assets/illustration_BC.png'

export const CityImage: FC = props =>
  <div
    style={{
      background: `url(${city1}) no-repeat`,
      backgroundPosition: '50% 100%',
      width: '100%',
      height: '100%'
    }}
  >{props.children}</div>
