import Network from "gi://AstalNetwork"
import { createBinding, createComputed } from "ags"

const network = Network.get_default()

const wifi = createBinding(network, "wifi")
const wired = createBinding(network, "wired")

export const networkIcon = createComputed(() => {
    
    const wifiDevice = wifi()
    const wiredDevice = wired()

    if (wiredDevice)
        return "󰈀"

    if (!wifiDevice?.enabled)
        return "󰤮"

    if (!wifiDevice?.ssid)
        return "󰤭"

    const strength = wifiDevice?.strength ?? 0

    if (strength >= 80) return "󰤨"
    if (strength >= 60) return "󰤥"
    if (strength >= 40) return "󰤢"
    if (strength >= 20) return "󰤟"

    return "󰤯"
})

export const networkTooltip = createComputed(() => {
    const wifiDevice = wifi()
    const wiredDevice = wired()

    if (wiredDevice)
        return "Ethernet"

    if (!wifiDevice?.enabled)
        return "WiFi Disabled"

    return wifiDevice?.ssid ?? "Not Connected"
})