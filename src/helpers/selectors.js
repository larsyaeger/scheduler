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