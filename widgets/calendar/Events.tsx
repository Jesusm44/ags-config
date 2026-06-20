import { createComputed, For } from "ags"
import { googleEvents } from "../../services/googleCalendar"
import { selectedDate } from "../../services/calendar"
import GLib from "gi://GLib?version=2.0"
import {
    setEditingEvent
} from "../../services/calendar"

export default function Events() {
    const events = createComputed(() =>{
        print("Recompute", googleEvents().length)

        return googleEvents().filter((event: any) => {
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
            <box orientation={1} spacing={5}>
                <For each={events}>
                    {(event: any) => (
                      <box spacing={5}>
                        <label 
                            label={`${event.start} | ${event.title}`}
                        />
                        <button 
                            onClicked={() => {
                                setEditingEvent(event)
                            }}
                        >
                            <label label="󰏫"/>
                        </button>
                        <button
                            onClicked={() => {
                                const cmd = 
                                    "/home/jesusm/.config/ags/venv/bin/python " +
                                    "/home/jesusm/.config/ags/delete_event.py " +
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