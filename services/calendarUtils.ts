import { googleEvents } from "./googleCalendar"
import type { CalendarEvents } from "./calendar"

export function nextEvent(): CalendarEvents | null {
    const now = new Date()

    const events = googleEvents()
        .filter((event: CalendarEvents) => {
            return new Date(event.start) > now
        })
        .sort((a: CalendarEvents, b: CalendarEvents) => {
            return (
                new Date(a.start).getTime() -
                new Date(b.start).getTime()
            )
        })

    if (events.length === 0)
        return null

    return events[0]
}

export function minutesUntilEvent(
    event: CalendarEvents,
): number {
    return Math.round(
        (
            new Date(event.start).getTime() -
            Date.now()
        ) / 1000 / 60
    )
}