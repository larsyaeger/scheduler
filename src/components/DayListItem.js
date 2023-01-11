import React from 'react';
import classNames from 'classnames';
import "./DayListItem.scss";

const formatSpots = spots => {
  if (!spots) {
    return 'no spots remaining'
  }
  if (spots === 1) {
    return `${spots} spot remaining`
  }
  return `${spots} spots remaining`
}

export default function DayListItem(props) {
const formattedMessage = formatSpots(props.spots)


  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  return (
    <li className={dayClass }onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{formattedMessage}</h3>
    </li>
  );
  }