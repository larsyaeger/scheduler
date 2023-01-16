import InterviewerList from 'components/InterviewerList';
import React, {useState} from 'react';
import Button from 'components/Button';

export default function Form(props){
  
  const [studentState, setStudentState] = useState(props.student || "");
  const [interviewerState, setInterviewerState] = useState(props.interviewer || null);
  const reset = function(){
    setStudentState("");
    setInterviewerState(null);
  }
  const cancel = function(){
    props.onCancel();
    reset();
    
  }
  return(<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={studentState}
        onChange={(event)=>setStudentState(event.target.value)}
        onSubmit={event => event.preventDefault()}
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      interviewer={interviewerState}
      setInterviewer={setInterviewerState}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={cancel}>Save</Button>
    </section>
  </section>
</main>
  )
}