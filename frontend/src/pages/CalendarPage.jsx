import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const theme = {
  orange: {
    default: "#FA4616",
    hover: "#FA4616",
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 10px 0;
  cursor: pointer;
  box-shadow: 0 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

export function CalendarPage() {

    let navigate;
    // do not delete this line :)
    navigate = useNavigate();
    const handleGoBack = () => {
    navigate(-1); // Navigates back one entry in the history stack
    };

    const myEvents = [
{ id: '1', title: 'Last day for enrollment  Fall Semester', start: '2025-08-01T10:00:00', allDay: true, color: 'orange' },
{ id: '2', title: 'Last day to apply for finance', start: '2025-08-04T10:00:00', allDay: true, color: '#FF6347' },
{ id: '3', title: 'Last day for Advance Registration', start: '2025-08-19T10:00:00', allDay: true, color: 'pink' },
{ id: '7', title: 'Deadline for Enrollment ', start: '2025-08-21T10:00:00', allDay: true, color: 'purple' },
{ id: '8', title: 'Late Pay Tuition', start: '2025-08-21T10:00:00', allDay: true, color: 'blue' },
{ id: '9', title: 'Last day for trayouts on Sports', start: '2025-08-28T10:00:00', allDay: true, color: 'brown' },
{ id: '10', title: 'Last day for Senior Project Enrollment', start: '2025-08-06T10:00:00', allDay: true, color: 'red' },
{ id: '11', title: 'Move In Day', start: '2025-08-15T10:00:00', allDay: true, color: '#FF00FF' },
{ id: '12', title: 'Drop / Add Periods ', start: '2025-08-21T10:00:00', allDay: true, color: '#c83dfb' },
{ id: '13', title: 'Undergraduate Research Expo', start: '2025-09-08T10:00:00', allDay: true, color: '#2a2030' },
{ id: '14', title: 'Getting Started Workshop', start: '2025-09-09T10:00:00', allDay: true, color: '#421344' },
{ id: '15', title: 'Sustainability Summit', start: '2025-09-12T10:00:00', allDay: true, color: '#d7d0ed' },
{ id: '16', title: 'Fall Undergraduate Research Symposium', start: '2025-10-16T10:00:00', allDay: true, color: '#debb81' },
{ id: '17', title: 'UF HHP Homecoming Tailgate', start: '2025-10-18T10:00:00', allDay: true, color: '#d7ae8b' },
{ id: '18', title: 'National Voter Registration Day', start: '2025-09-16T10:00:00', allDay: true, color: '#70a858' },
{ id: '19', title: 'UF GPT: Microsoft Copilot - UF AI Assistant for Work (CITT)', start: '2025-11-05T10:00:00', allDay: true, color: '#1b753e' },
{ id: '20', title: 'Lecture: NYT Bestselling Author Michael Grunwald', start: '2025-11-14T10:00:00', allDay: true, color: '#0d221b' },
{ id: '21', title: 'UF GPT: Microsoft Copilot - UF AI Assistant for Work (CITT)', start: '2025-12-09T10:00:00', allDay: true, color: '#3a724c' },

    ];

    return <div>
        <Fullcalendar plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                      initialView={"dayGridMonth"}
                      headerToolbar={{start:"today prev,next",center:"title",end:"dayGridMonth,timeGridWeek,timeGridDay"}}
                      height={"90vh"}
                      events={myEvents}
        />
        <Button theme="orange" onClick={handleGoBack}>Go Back</Button>

    </div>;

}

export default CalendarPage;




