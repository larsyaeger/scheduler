//import React, { useState, useEffect } from "react";
import React from 'react';
import DayList from "./DayList";
import Appointment from './Appointment';
import "components/Application.scss";
//import axios from "axios";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {

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