export function getAppointmentsForDay(state, day) {
  const dayArray = [];
  state.days.forEach((object) => {
    if (object.name === day) {
      object.appointments.forEach(appointment => {
        for (const [appointmentNumber, appointmentObject] of  Object.entries(state.appointments)) {
          //console.log(appointmentObject);
          if (appointmentObject.id === appointment) {
            dayArray.push(appointmentObject)
          }
          // state.appointments.forEach(appointmentObject => {
          //   if (appointmentObject.key === appointment) {
          //     dayArray.push(appointmentObject);
          //   }
          // });
         } //dayArray.push(state.appointments);
        });
      //dayArray.push(object);
    }
  });
  //console.log('dayArray under here!!!!!!!!!!!');
  //console.log(dayArray);
  return dayArray;
}