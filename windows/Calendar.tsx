import { calendarOpen, setCalendarOpen } from "../services/calendar"
import Clock from "../widgets/calendar/Clock"
import MonthCalendar from "../widgets/calendar/MonthCalendar"
import Weather from "../widgets/calendar/Weather"
import Forecast from "../widgets/calendar/Forecast"
import Events from "../widgets/calendar/Events"



export default function Calendar() {
    return (
        <window
            name="calendar"
            visible={calendarOpen}
            onNotifyIsActive={({is_active}) => {
                if (!is_active)
                    setCalendarOpen(false)
            }}
        >
            <box
                orientation={1}
                spacing={10}
            >
                <Clock />

                <MonthCalendar/>

                <Weather />

                <Forecast/>

                <Events/>
            </box>
        </window>
    )
}