import Bluetooth from "gi://AstalBluetooth"
import { createBinding, createState } from "ags"
import { execAsync } from "ags/process"

const bluetooth = Bluetooth.get_default()

export const powered =
    createBinding(bluetooth, "isPowered")

export const [devices, setDevices] =
    createState([...bluetooth.devices])

bluetooth.connect("device-added", () => {
    setDevices([...bluetooth.devices])
})

bluetooth.connect("device-removed", () => {
    setDevices([...bluetooth.devices])
})

async function bluetoothctl(...args: string[]) {
    try {
        return await execAsync([
            "bluetoothctl",
            ...args,
        ])
    } catch (e) {
        throw e
    }
}

function refreshDevice() {
    setDevices([...bluetooth.devices])
}

async function runCommand(...args:string[]) {
    await bluetoothctl(...args)
    refreshDevice()
}

export async function connectDevice(address: string) {
    await runCommand(
        "connect",
        address,
    )
}

export async function disconnectDevice(address: string) {
    await runCommand(
        "disconnect",
        address,
    )
}

export async function pairDevice(address: string) {
    await runCommand(
        "pair",
        address,
    )
}

export async function removeDevice(address: string) {
    await runCommand(
        "remove",
        address,
    )
}

export async function infoDevice(address: string) {
    await runCommand(
        "info",
        address,
    )
}


export async function scanDevices() {
    try {
        print("Scanning...")

        await execAsync([
            "bluetoothctl",
            "--timeout",
            "5",
            "scan",
            "on",
        ])
        refreshDevice()
    } catch (e) {
    }
}
export function toggleBluetooth() {
    bluetooth.toggle()
}

export const [bluetoothOpen, setBluetoothOpen] =
    createState(false)

    
export function toggleBluetoothWindow() {
    setBluetoothOpen(!bluetoothOpen())
}


export function getDeviceIcon(device: any): string {
    switch (device.icon) {
        case "audio-headset":
            return "󰋋"

        case "audio-headphones":
            return "󰋎"

        case "audio-speakers":
            return "󰓃"

        case "input-keyboard":
            return "󰌌"

        case "input-mouse":
            return "󰍽"

        case "phone":
            return "󰏲"

        case "computer":
            return "󰌢"

        case "printer":
            return "󰐪"

        case "camera":
            return "󰄀"

        default:
            return "󰂯"
    }
}