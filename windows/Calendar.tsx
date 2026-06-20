import { calendarOpen, setCalendarOpen } from "../services/calendar"
import Clock from "../widgets/calendar/Clock"
import MonthCalendar from "../widgets/calendar/MonthCalendar"
import Weather from "../widgets/calendar/Weather"
import Forecast from "../widgets/calendar/Forecast"
import Events from "../widgets/calendar/Events"
import CreateEvent from "../widgets/calendar/CreateEvent"
import app from "ags/gtk4/app" ///
import { Astal } from "ags/gtk4" /// 
import EditEvent from "../widgets/calendar/EditEvent"


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

                <CreateEvent/>

                <EditEvent/>

                <Weather />

                <Forecast/>

                <Events/>
            </box>
        </window>
    )
}