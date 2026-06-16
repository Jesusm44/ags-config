import Gio from "gi://Gio"
import { createComputed } from "ags"

export const googleEvents = createComputed(() => {
    try {
        const file = Gio.File.new_for_path(
            "/tmp/google-calendar.json"
        )

        const [, bytes] = file.load_contents(null)

        const content = new TextDecoder()
            .decode(bytes)

        return JSON.parse(content)
    } catch {
        return []
    }
})

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