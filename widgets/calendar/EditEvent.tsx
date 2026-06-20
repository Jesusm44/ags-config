import { createComputed } from "ags"
import {
    editingEvent,
    setEditingEvent,
} from "../../services/calendar"

import Gtk from "gi://Gtk?version=4.0"
import GLib from "gi://GLib?version=2.0"

export default function EditEvent() {
    let titleEntry: Gtk.Entry | null = null
    let hourEntry: Gtk.Entry | null = null
    let minuteEntry: Gtk.Entry | null = null

    const event = createComputed(() => editingEvent())

    function saveEvent() {
        const current = event()

        if (!current)
            return

        if (!titleEntry || !hourEntry || !minuteEntry)
            return

        const title =
            titleEntry.get_text().trim()

        const hour =
            hourEntry.get_text().trim()

        const minute =
            minuteEntry.get_text().trim()

        const date = new Date(current.start)

        const isoDate =
            `${date.getFullYear()}-` +
            `${String(date.getMonth() + 1).padStart(2, "0")}-` +
            `${String(date.getDate()).padStart(2, "0")}T` +
            `${hour.padStart(2, "0")}:` +
            `${minute.padStart(2, "0")}:00`

        const cmd =
            "/home/jesusm/.config/ags/venv/bin/python " +
            "/home/jesusm/.config/ags/update_event.py " +
            `"${current.id}" ` +
            `"${title}" ` +
            `"${isoDate}"`

        GLib.spawn_command_line_async(cmd)

        GLib.timeout_add(
            GLib.PRIORITY_DEFAULT,
            3000,
            () => {
                GLib.spawn_command_line_async(
                    "/home/jesusm/.config/ags/scripts/update-calendar.sh"
                )

                setEditingEvent(null)

                return GLib.SOURCE_REMOVE
            }
        )
    }

    return (
        <box
            orientation={1}
            spacing={5}
            visible={createComputed(() => !!event())}
        >
            <entry
                text={createComputed(() =>
                    event()?.title ?? ""
                )}
                $={(self) => {
                    titleEntry = self
                }}
            />

            <box spacing={5}>
                <entry
                    widthRequest={50}
                    text={createComputed(() => {
                        const current = event()

                        if (!current)
                            return ""

                        return String(
                            new Date(current.start).getHours()
                        ).padStart(2, "0")
                    })}
                    $={(self) => {
                        hourEntry = self
                    }}
                />

                <entry
                    widthRequest={50}
                    text={createComputed(() => {
                        const current = event()

                        if (!current)
                            return ""

                        return String(
                            new Date(current.start).getMinutes()
                        ).padStart(2, "0")
                    })}
                    $={(self) => {
                        minuteEntry = self
                    }}
                />
            </box>

            <button onClicked={saveEvent}>
                <label label="Save" />
            </button>
        </box>
    )
}