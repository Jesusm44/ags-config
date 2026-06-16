import Wp from "gi://AstalWp"
import { createBinding, createComputed } from "ags"

const wp = Wp.get_default()
const speaker = wp.default_speaker

export const volume = createBinding(speaker, "volume")
export const mute = createBinding(speaker, "mute")

function volumeIcon(volume: number, muted: boolean) {
    if (muted)
        return "󰖁"

    if (volume >= 90) return "󰕾"
    if (volume >= 70) return "󰕾"
    if (volume >= 40) return "󰖀"
    if (volume >= 1) return "󰕿"

    return "󰝟"
}

export const audioIcon = createComputed(() =>
    volumeIcon(
        Math.round(volume() * 100),
        mute(),
    )
)

export const audioText = createComputed(() =>
    `${Math.round(volume() * 100)}%`
)