import { forecast } from "../../services/weather"
import type { ForecastDay } from "../../services/weather"
import { For } from "gnim"

export default function Forecast() {
    return (
        <box orientation={1} spacing={4}>
            <For each={forecast}>
                {(day: ForecastDay) => (
                    <label
                        label={`${day.icon} ${day.day} ${day.max}°/${day.min}°`}
                    />
                )}
            </For>
        </box>
    )
}