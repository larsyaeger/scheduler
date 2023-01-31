export function getAppointmentsForDay(state, day) {
  const dayArray = [];
  state.days.forEach((object) => {
    if (object.name === day) {
      object.appointments.forEach(appointment => {
        for (const [appointmentObject] of Object.entries(state.appointments)) {
          if (appointmentObject.id === appointment) {
            dayArray.push(appointmentObject);
          }
        }
      });
    }
  });
  return dayArray;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const filteredInterview = {};
  filteredInterview.student = interview.student;
  filteredInterview.interviewer = state.interviewers[interview.interviewer];
  return filteredInterview;
}

export function getInterviewersForDay(state, day) {
  const dayArray = [];
  state.days.forEach((object) => {
    if (object.name === day) {
      object.interviewers.forEach(interview => {
        for (const [interviewerObject] of Object.entries(state.interviewers)) {
          if (interviewerObject.id === interview) {
            dayArray.push(interviewerObject);
          }
        }
      });
    }
  });
  return dayArray;
}