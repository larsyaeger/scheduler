export function getAppointmentsForDay(state, day) {
  const dayArray = [];
  state.days.forEach((object) => {
    if (object.name === day) {
      object.appointments.forEach(appointment => {
        for (const [appointmentNumber, appointmentObject] of Object.entries(state.appointments)) {
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
  if(!interview) return null;
  const filteredInterview = {};
  filteredInterview.student = interview.student;
  filteredInterview.interviewer = state.interviewers[interview.interviewer];
  return filteredInterview;
}