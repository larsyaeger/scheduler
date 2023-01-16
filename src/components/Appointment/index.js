import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    setTimeout(function() {
      props.bookInterview(props.id, interview) // runs first
      transition(SHOW) // runs second
    }, 1000)
  }
  function deleteApp(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    setTimeout(() => {
      props.deleteAppointment(props.id, interview)
      transition(EMPTY)
    }, 1000)
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=>transition(CONFIRM)}
        />
      )}
      {mode === CREATE &&(
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status/>
      )}
      {mode === CONFIRM && (
        <Confirm
        message="Are you sure you want to delete this appointment"
        onCancel={back}
        onConfirm={deleteApp}
        />
      )}

    </article>
  );
}