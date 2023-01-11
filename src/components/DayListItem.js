import React from 'react';
import classNames from 'classnames';
import "./DayListItem.scss";
export default function DayListItem(props) {

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  return (
    <li className={dayClass }onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{props.spots} spots remaining</h3>
    </li>
  );
  }
  //   /Users/larsyaeger/lighthouse/scheduler/src/components/DayListItem.scss