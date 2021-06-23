import * as React from 'react'
import { FC, useRef, useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { startOfDay } from 'date-fns'

import rightArrowIcon from '../assets/rightArrow.png'
import calendarIcon from '../assets/calendar.png'

interface DayPickerProps {
  onSubmit: (fromDate: Date | undefined, toDate: Date | undefined) => void
}

export const DayPickerRange: FC<DayPickerProps> = props => {
  const [start, setStart] = useState<Date>()
  const [end, setEnd] = useState<Date>()
  const toRef = useRef<DayPickerInput>()
  const modifiers = {start, end}

  const selectedRangeCalculation = (fromDate: Date | undefined, toDate: Date | undefined) => {
    if (fromDate && toDate) {
      props.onSubmit(fromDate, toDate)
    }
  }

  const handleFromChange = (newStart: Date) => {
    const normalizedNewStart = startOfDay(newStart)
    setStart(normalizedNewStart)
    selectedRangeCalculation(normalizedNewStart, end)
  }

  const handleToChange = (newEnd: Date) => {
    setEnd(undefined)
    const normalizedNewEnd = startOfDay(newEnd)
    setEnd(normalizedNewEnd)
    // showFromMonth() // TODO
    selectedRangeCalculation(start, normalizedNewEnd)
  }

  const renderIcon = (alt: string, src: string) =>
    <img alt={alt} src={src} className="w-6 h-6 block mx-3"/>

  return (
    <div className="flex bg-white font-bold items-center justify-center">
      {renderIcon("Calendar", calendarIcon)}
      <DayPickerInput
        value={start}
        placeholder="From"
        format="LL"
        dayPickerProps={{
          selectedDays: [start, {start, end}] as any,
          disabledDays: {after: end} as any,
          toMonth: end,
          modifiers,
          numberOfMonths: 2,
        }}
        onDayChange={handleFromChange}
      />
      {' '}
      {renderIcon("Right arrow", rightArrowIcon)}
      {' '}
      {renderIcon("Calendar", calendarIcon)}
      <span className="InputFromTo-to">
        <DayPickerInput
          inputProps={{
            ref: toRef
          }}
          value={end}
          placeholder="To (including)"
          format="LL"
          dayPickerProps={{
            selectedDays: [start, {start, end}] as any,
            disabledDays: {before: start} as any,
            modifiers,
            month: start,
            fromMonth: start,
            numberOfMonths: 2,
          }}
          onDayChange={handleToChange}
        />
      </span>
    </div>
  )
}
