import * as React from 'react'
import { FC } from 'react'
import ReactTable from 'react-table'

// export class Booking {
//   id?: number;
//   startDate: Date;
//   endDate: Date;

//   user: User;
//   spot: Spot;
// }

const columns = [
  {
    Header: 'Start Date',
    accessor: 'startDate'
  },
  {
    Header: 'End Date',
    accessor: 'endDate'
  },
  {
    Header: 'Spot',
    accessor: 'spot.number',
  },
]

const data = [
  {
    id: 1,
    startDate: '2021-06-16',
    endDate: '2021-06-18',
    userId: 3,
    spot: {
      id: 14,
      number: 14
    }
  }
]

export const ReportsPage: FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <ReactTable
        data={data}
        columns={columns}
      />
    </div>
  )
}
