import React from 'react';
import './InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem';
export default function InterviewerList(props) {
  const list = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      selected={props.interviewer === interviewer.id}
      setInterviewer={props.setInterviewer}
      {...interviewer}
      />
    )
  })
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{list}</ul>
</section>

  )
}