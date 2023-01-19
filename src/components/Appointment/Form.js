import InterviewerList from 'components/InterviewerList';
import React, {useState} from 'react';
import Button from 'components/Button';

export default function Form(props){
  
  const [studentName, setStudentName] = useState(props.student || "");
  const [interviewerName, setInterviewerName] = useState(props.interviewer || null);
  const [error, setError] = useState('');
  const reset = function(){
    setStudentName("");
    setInterviewerName(null);
  }
  const cancel = function(){
    props.onCancel();
    reset();
    
  }

  // function validate() {
  //   if (props.value === '') {
  //     setError('Student name cannot be blank');
  //     return;
  //   }
  //   setError('')
  //   // if (props.interviewer === null) {
  //   //   setError('Please select an interviewer');
  //   //   return;
  //   // }
  //   props.onSave(value, interviewer)
  // }
  return(<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={studentName}
        onChange={(event)=>setStudentName(event.target.value)}
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
      <Button confirm onClick={()=>props.onSave(studentName, interviewerName)}>Save</Button>
    </section>
  </section>
</main>
  )
}