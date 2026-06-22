import Gio from "gi://Gio?version=2.0";
import { createState } from "ags";


const [googleEvents, setGoogleEvents] = 
    createState<any[]>([])

function loadEvents() {
    try {
        const file = Gio.file_new_for_path(
            "/tmp/google-calendar.json"
        )

        const [, bytes] = file.load_contents(null)

        const content = new TextDecoder().decode(bytes)

        const parsed = JSON.parse(content)


        setGoogleEvents([...parsed])

    } catch {
        setGoogleEvents([])
    }
}

loadEvents()


const file = Gio.file_new_for_path(
    "/tmp/google-calendar.json"
)

const monitor = file.monitor_file(
    Gio.FileMonitorFlags.NONE, null,
)

monitor.connect("changed", () => {
    loadEvents()
})

export { googleEvents, loadEvents}

export function eventCountForDay(
    year: number,
    month: number,
    day: number,
) {
    return googleEvents().filter((event: any) => {
        const date = new Date(event.start)

        return (
            date.getFullYear() === year &&
            date.getMonth() === month &&
            date.getDate() === day
        )
    }).length
}