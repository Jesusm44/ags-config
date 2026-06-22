import GLib from "gi://GLib?version=2.0"
import { googleEvents } from "./googleCalendar"
import type { CalendarEvents } from "./calendar"

const notified10 = new Set<string>()
const notified5 = new Set<string>()
const notified1 = new Set<string>()
const notifiedNow = new Set<string>()

export function startNotifications(): void {
    GLib.timeout_add_seconds(
        GLib.PRIORITY_DEFAULT,
        5,
        () => {
            checkEvents()
            return GLib.SOURCE_CONTINUE
        },
    )
}

function sendNotification(
    title: string,
    body: string,
): void {
    GLib.spawn_command_line_async(
        `notify-send "${title}" "${body}"`
    )
}

function notifyOnce(
    event: CalendarEvents,
    diffMinutes: number,
    upper: number,
    lower: number,
    notified: Set<string>,
    title: string,
    body: string,
): void {
    if (
        diffMinutes <= upper &&
        diffMinutes > lower &&
        !notified.has(event.id)
    ) {
        notified.add(event.id)

        sendNotification(title, body)
    }
}

function checkEvents(): void {
    const now = new Date()

    googleEvents().forEach((event: CalendarEvents) => {
        const eventDate = new Date(event.start)

        const diffMinutes =
            (eventDate.getTime() - now.getTime()) /
            1000 /
            60

        notifyOnce(
            event,
            diffMinutes,
            10,
            9.5,
            notified10,
            ` ${event.title}`,
            "Starts in 10 minutes",
        )

        notifyOnce(
            event,
            diffMinutes,
            5,
            4.5,
            notified5,
            ` ${event.title}`,
            "Starts in 5 minutes",
        )

        notifyOnce(
            event,
            diffMinutes,
            1,
            0.5,
            notified1,
            ` ${event.title}`,
            "Starts in 1 minute",
        )

        notifyOnce(
            event,
            diffMinutes,
            0,
            -0.5,
            notifiedNow,
            ` ${event.title}`,
            "Event has started",
        )
    })
}