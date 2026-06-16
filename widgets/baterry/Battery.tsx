import Battery from "gi://AstalBattery"
import { createBinding, createComputed } from "ags"

const battery = Battery.get_default()

function batteryIcon(percent: number, charging: boolean) {
    if (charging) return "󰂄"

    if (percent >= 90) return "󰁹"
    if (percent >= 80) return "󰂂"
    if (percent >= 70) return "󰂁"
    if (percent >= 60) return "󰂀"
    if (percent >= 50) return "󰁿"
    if (percent >= 40) return "󰁾"
    if (percent >= 30) return "󰁽"
    if (percent >= 20) return "󰁼"
    if (percent >= 10) return "󰁻"

    return "󰁺"
}

export default function BatteryWidget() {
    const percentage = createBinding(battery, "percentage")
    const charging = createBinding(battery, "charging")

    const icon = createComputed(() =>
        batteryIcon(
            Math.round(percentage() * 100),
            charging(),
        )
    )

    return (
        <box spacing={4}>
            <label label={icon}/>

            <label 
                label={percentage. as(
                    (p: number) => `${Math.round(p * 100)}%`
                )}
            />
        </box>
    )
}