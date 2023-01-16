import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from './Appointment';
import "components/Application.scss";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  })
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState(prev => ({
    ...prev,
    day
  }))

  useEffect(()=>{
    Promise.all([

      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')

    ]).then((all)=>{

      const interviewers = all[2].data
      const days = all[0].data
      const appointments = all[1].data

      setState(prev=>({

        ...prev,
        days,
        appointments,
        interviewers
      }))
    })
  },[])


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
          const dailyInterviewers = getInterviewersForDay(state, state.day)
          return (
            <Appointment
              key={appointment.id}
              
              id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
            />
          );
        })}
      </section>

    </main>

  );
}
//{...appointment}