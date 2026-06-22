import { createComputed, For } from "ags"
import { googleEvents } from "../../services/googleCalendar"
import { CalendarEvents, selectedDate } from "../../services/calendar"
import GLib from "gi://GLib?version=2.0"
import { Gtk } from "ags/gtk4"


export default function Events() {
    const events = createComputed(() =>{

        return googleEvents().filter((event: CalendarEvents) => {
            const eventDate = new Date(event.start)
            const selected = selectedDate()

            return(
                eventDate.getFullYear() === selected.getFullYear()
                && eventDate.getMonth() === selected.getMonth()
                && eventDate.getDate() === selected.getDate()
            )
        })
    })

    return (
        <box orientation={1}>
            <box 
                orientation={1} 
                spacing={5}
                halign={Gtk.Align.CENTER}
            >
                <For each={events}>
                    {(event: CalendarEvents) => (
                      <box spacing={5}>
                        <label 
                            label={`${event.start} | ${event.title}`}
                        />
                        <button
                            onClicked={() => {
                                const cmd = 
                                    "/home/jesusm/.config/ags/venv/bin/python " +
                                    "/home/jesusm/.config/ags/Backend/delete_event.py " +
                                    event.id
                                GLib.spawn_command_line_async(cmd)

                                GLib.timeout_add(
                                    GLib.PRIORITY_DEFAULT,2000,() => {
                                        GLib.spawn_command_line_async(
                                            "/home/jesusm/.config/ags/scripts/update-calendar.sh"
                                        )
                                        return GLib.SOURCE_REMOVE
                                    }
                                )
                            }}
                        >
                            <label label= "󰆴" />
                        </button>
                      </box>
                    )}
                </For>
            </box>
        </box>
    )
}