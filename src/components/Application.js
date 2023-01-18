//import React, { useState, useEffect } from "react";
import React from 'react';
import DayList from "./DayList";
import Appointment from './Appointment';
import "components/Application.scss";
//import axios from "axios";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  
  // const [state, setState] = useState({
  //   day: 'Monday',
  //   days: [],
  //   appointments: {}
  // });
  // const setDay = day => setState(prev => ({
  //   ...prev,
  //   day
  // }));
  // useEffect(() => {
  //   Promise.all([

  //     axios.get('/api/days'),
  //     axios.get('/api/appointments'),
  //     axios.get('/api/interviewers')

  //   ]).then((all) => {

  //     const interviewers = all[2].data;
  //     const days = all[0].data;
  //     const appointments = all[1].data;

  //     setState(prev => ({

  //       ...prev,
  //       days,
  //       appointments,
  //       interviewers
  //     }));
  //   });
  // }, []);

  // function bookInterview(id, interview) {
  //   //console.log(id, interview);
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   setState({
  //     ...state,
  //     appointments});
  //     //console.log(id)/
    
  //   return axios.put(`/api/appointments/${id}`, appointment)
  //   //transition(SHOW);
  // }
  // function deleteAppointment(id, interview) {
  //   //console.log(id, interview);
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   setState({
  //     ...state,
  //     appointments});
  //     //console.log(id)/
  //     console.log('before axios');
  //   return axios.delete(`/api/appointments/${id}`, appointment)
  //   //transition(SHOW);
  // }
  const { state, setDay, bookInterview, deleteAppointment } = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Object.values(dailyAppointments).map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          const dailyInterviewers = getInterviewersForDay(state, state.day);
          return (
            <Appointment
              key={appointment.id}
              bookInterview={bookInterview}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
              deleteAppointment={deleteAppointment}
            />
          );
        })}
      </section>

    </main>

  );
}
//{...appointment}