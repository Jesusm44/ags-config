import { createComputed } from "ags"
import {
    nextEvent,
    minutesUntilEvent,
} from "../../services/calendarUtils"

export default function NextEvent() {
    const event = createComputed(() => nextEvent())

    return (
        <box
            orientation={1}
            spacing={6}
            cssClasses={["next-event"]}
            visible={createComputed(() => !!event())}
        >
            <label
                label="󰃰 Next Event"
                cssClasses={["next-event-title"]}
            />

            <label
                label={createComputed(() =>
                    event()?.title ?? ""
                )}
                cssClasses={["next-event-name"]}
            />

            {/* <label
                label={createComputed(() => {
                    const current = event()

                    if (!current)
                        return ""

                    const date = new Date(current.start)

                    return date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                })}
            /> */}

            {/* <label
                label={createComputed(() => {
                    const current = event()

                    if (!current)
                        return ""

                    return `Starts in ${minutesUntilEvent(current)} min`
                })}
            /> */}
        </box>
    )
}