import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const schedule = props.days.map(date => {
    return (
      <DayListItem
      key={date.id}
      selected={date.name === props.value}
      setDay={props.onChange}
      {...date}
      />
    )
  })
  return (
    <ul>{schedule}</ul>
  )
}