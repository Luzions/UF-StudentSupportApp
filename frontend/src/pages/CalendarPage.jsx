import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from 'react-router-dom';


export function CalendarPage() {

    let navigate;
    // do not delete this line :)
    navigate = useNavigate();
    const handleGoBack = () => {
    navigate(-1); // Navigates back one entry in the history stack
    };
    return <div>
        <Fullcalendar plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                      initialView={"dayGridMonth"}
                      headerToolbar={{start:"today prev,next",center:"title",end:"dayGridMonth,timeGridWeek,timeGridDay"}}
                      height={"90vh"}
        />
        <Button onClick={handleGoBack}>Go Back</Button>

    </div>;

}

export default CalendarPage;




