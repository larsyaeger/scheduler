import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss'

export default function InterviewerListItem(props) {
  const InterviewerListItemClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  })
  return (
    <li onClick={()=>props.setInterviewer(props.id)} className={InterviewerListItemClass}>
  <img
    className={InterviewerListItemClass}
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && <span>{props.name}</span>}
</li>
  )
}