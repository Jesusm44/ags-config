import Bluetooth from "gi://AstalBluetooth"
import { createBinding } from "ags"

const bluetooth = Bluetooth.get_default()

export const powered =
    createBinding(bluetooth, "isPowered")

export const connected =
    createBinding(bluetooth, "isConnected")

export function toggleBluetooth() {
    try {
        bluetooth.toggle()
    } catch (err) {
    }
}