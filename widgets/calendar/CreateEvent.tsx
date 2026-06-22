import Gtk from "gi://Gtk?version=4.0";
import GLib from "gi://GLib?version=2.0";
import { selectedDate } from "../../services/calendar";
import { loadEvents } from "../../services/googleCalendar";



export default function CreateEvent() {
    let entry: Gtk.Entry | null = null
    let hourEntry: Gtk.Entry | null = null
    let minuteEntry: Gtk.Entry | null = null

    function createEvent() {
        if (!entry)
            return 

        const currentTitle = entry.get_text().trim()

        if (!currentTitle)
            return

        const date = selectedDate()

        const hour = 
            hourEntry?.get_text().trim() || "08"
        
        const minute = 
            minuteEntry?.get_text().trim() || "00"

        const isoDate =
            `${date.getFullYear()}-` +
            `${String(date.getMonth() + 1).padStart(2, "0")}-` +
            `${String(date.getDate()).padStart(2, "0")}T` +
            `${hour.padStart(2, "0")}:` +
            `${minute.padStart(2, "0")}:00`


        GLib.spawn_command_line_async(
            `/home/jesusm/.config/ags/venv/bin/python ` +
            `/home/jesusm/.config/ags/Backend/create_event.py ` +
            `"${currentTitle}" ` +
            `"${isoDate}"`
        )

        GLib.timeout_add(
            GLib.PRIORITY_DEFAULT, 3000, () => {
                GLib.spawn_command_line_async(
                    "/home/jesusm/.config/ags/scripts/update-calendar.sh"
                )
                GLib.timeout_add(
                    GLib.PRIORITY_DEFAULT, 1000, () => {
                        loadEvents()
                        return GLib.SOURCE_REMOVE
                    }
                )
                return GLib.SOURCE_REMOVE
            }
        )
    }
    return (
        <box orientation={1} spacing={5}>
            <entry
                $={(self) => {
                    entry = self
                }}
                placeholderText="New Event" />
            <box spacing={5}>
                <entry 
                    placeholderText="HH"
                    widthRequest={50}
                    $={(self) => {
                        hourEntry = self
                    }}
                />
                <entry
                    placeholderText="MM"
                    widthRequest={50}
                    $={(self) => {
                        minuteEntry = self
                    }}
                />
            </box>
            <button onClicked={createEvent}>
                <label label="Create Event"/>
            </button>
        </box>
    )

}