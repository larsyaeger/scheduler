import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useApplicationData() {

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
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments});
      //console.log(id)/
    
    return axios.put(`/api/appointments/${id}`, appointment)
    //transition(SHOW);
  }

  function deleteAppointment(id, interview) {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments});
      //console.log(id)/
      console.log('before axios');
    return axios.delete(`/api/appointments/${id}`, appointment)
    //transition(SHOW);
  }
  return {
    state,
    setDay,
    bookInterview,
    deleteAppointment
  }
}