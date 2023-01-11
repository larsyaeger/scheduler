import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const schedule = props.days.map(date => {
    return (
      <DayListItem
      key={date.id}
      selected={date.name === props.day}
      setDay={props.setDay}
      {...date}
      />
    )
  })
  return (
    <ul>{schedule}</ul>
  )
}