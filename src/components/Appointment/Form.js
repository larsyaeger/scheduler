import InterviewerList from 'components/InterviewerList';
import React, { useState } from 'react';
import Button from 'components/Button';

export default function Form(props) {

  const [studentName, setStudentName] = useState(props.student || "");
  const [interviewerName, setInterviewerName] = useState(props.interviewer || null);
  const [error, setError] = useState('');
  //used for cancelling when creating an appointment
  const reset = function() {
    setStudentName("");
    setInterviewerName(null);
  };
  //when cancel is clicked when creating an appointment
  const cancel = function() {
    props.onCancel();
    reset();
  };
  //this function makes sure name cannot be blank when creating or editing an appointment
  function validate() {
    
    if (studentName === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewerName === null) {
      alert('Please select an interviewer');
      return;
    }
    setError("");
    props.onSave(studentName, interviewerName);
  }
  return (<main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={studentName}
          onChange={(event) => setStudentName(event.target.value)}
          onSubmit={event => event.preventDefault()}
          data-testid="student-name-input"
        />
      </form>
      <section className='appointment__validation'>{error}</section>
      <InterviewerList
        interviewers={props.interviewers}
        interviewer={interviewerName}
        setInterviewer={setInterviewerName}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
  );
}