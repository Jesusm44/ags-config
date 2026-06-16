import { googleEvents } from "../../services/googleCalendar"

export default function Events() {
    const events = googleEvents()

    return (
        <box orientation={1}>
            <label label={`Eventos: ${events.length}`} />

            {events.slice(0, 10).map((event: any) => (
                <label
                    label={`${event.start} | ${event.title}`}
                />
            ))}
        </box>
    )
}