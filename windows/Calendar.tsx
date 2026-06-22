import { calendarOpen, setCalendarOpen } from "../services/calendar"
import Clock from "../widgets/calendar/Clock"
import MonthCalendar from "../widgets/calendar/MonthCalendar"
import Weather from "../widgets/calendar/Weather"
import Forecast from "../widgets/calendar/Forecast"
import Events from "../widgets/calendar/Events"
import CreateEvent from "../widgets/calendar/CreateEvent"
import NextEvent from "../widgets/calendar/NextEvent"
import Holiday from "../widgets/calendar/Holiday"


import app from "ags/gtk4/app" 
import { Astal } from "ags/gtk4" 


export default function Calendar() {
    return (
        <window
            name="calendar"
            visible={calendarOpen}
            application={app}
            keymode={Astal.Keymode.ON_DEMAND}
        >
            <box
                orientation={1}
                spacing={10}
            >
                <Clock />

                <MonthCalendar/>

                <NextEvent/>

                <CreateEvent/>

                <Weather />

                <Forecast/>

                <Holiday/>

                <Events/>
            </box>
        </window>
    )
}