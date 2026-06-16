import { bartime, barDate } from "../../services/clock"
import { toggleCalendar } from "../../services/calendar"

export default function CalendarButton() {
    return (
        <button onClicked={toggleCalendar}>
            <box spacing={8}>
                <label label={barDate}/>
                <label label="|"/>
                <label label={bartime}/>
            </box>
        </button>
    )
}