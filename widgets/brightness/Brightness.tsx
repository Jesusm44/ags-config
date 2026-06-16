import Brightness from "gi://AstalBrightness"
import { createBinding, createComputed } from "ags"

const brightness = Brightness.get_default()
const screen = brightness.screen

function brightnessIcon(percent: number) {
    if (percent >= 90) return "󰃠"
    if (percent >= 70) return "󰃟"
    if (percent >= 40) return "󰃝"

    return "󰃞"
}

export default function BrightnessWidget() {
    const level = createBinding(
        screen,
        "brightness",
    )

    const icon = createComputed(() =>
        brightnessIcon(
            Math.round(level() * 100),
        )
    )

    return (
        <box spacing={4}>
            <label label={icon} />

            <label
                label={level.as(
                    v => `${Math.round(v * 100)}%`,
                )}
            />
        </box>
    )
}