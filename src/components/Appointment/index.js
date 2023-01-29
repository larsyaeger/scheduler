import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const regex = /[a-zA-Z]/;
  const CONFIRM = 'CONFIRM';
  const DELETE = 'DELETE';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    if (regex.test(name) !== true){
      alert('Name cant be empty, and must contain at least 1 letter')
    } else if (regex.test(name) === true) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(()=>{ 
        transition(SHOW)})
      .catch(error =>{
        transition(ERROR_SAVE, true);
      })
    }
  }
  function deleteApp(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETE, true);
    props
    .deleteAppointment(props.id, interview)
    .then(()=>{
      transition(EMPTY)})
    .catch(error => {
      transition(ERROR_DELETE, true)})
  }
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status 
        message="Saving"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this appointment"
          onCancel={back}
          onConfirm={deleteApp}
        />
      )}
      {mode === DELETE && (
        <Status
          message="Deleting appointment"
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message="ERROR could not save appointment"
        onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message="ERROR could not delete appointment"
        onClose={back}
        />
      )}

    </article>
  );
}