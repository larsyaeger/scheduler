import React from 'react';
import './InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';
function InterviewerList(props) {
  const list = Array.isArray(props.interviewers) &&
  props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.interviewer === interviewer.id}
      setInterviewer={()=>props.setInterviewer(interviewer.id)}
      //{...interviewer}
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
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList