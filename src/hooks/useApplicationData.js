import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useApplicationData() {
//for updating spots after booking or deleting an appointment
  const today = (day) => {
    const daysObj = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysObj[day]
  }
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const setDay = day => setState(prev => ({
    ...prev,
    day
  }));

  useEffect(() => {
    Promise.all([

      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')

    ]).then((all) => {

      const interviewers = all[2].data;
      const days = all[0].data;
      const appointments = all[1].data;

      setState(prev => ({

        ...prev,
        days,
        appointments,
        interviewers
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const appointmentDay = today(state.day)
      let day = {
        ...state.days[appointmentDay],
        spots: state.days[appointmentDay]
      }

      if (!state.appointments[id].interview) {
        
        day = {
          ...state.days[appointmentDay],
          spots: state.days[appointmentDay].spots - 1
        } 
      } else {
        day = {
          ...state.days[appointmentDay],
          spots: state.days[appointmentDay].spots
        } 
      }
  
      let days = state.days
      days[appointmentDay] = day;
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({...state, appointments, days});
    })
  }

  function deleteAppointment(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
      //interview:null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const appointmentDay = today(state.day)

    const day = {
      ...state.days[appointmentDay],
      spots: state.days[appointmentDay].spots + 1
    }

    let days = state.days
    days[appointmentDay] = day;
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(()=>{
      setState({...state, appointments, days });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    deleteAppointment
  }
}