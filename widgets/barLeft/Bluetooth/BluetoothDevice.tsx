import Gtk from "gi://Gtk?version=4.0"
import { createBinding } from "ags"

import {
    getDeviceIcon,
    connectDevice,
    disconnectDevice,
    pairDevice,
    removeDevice,
} from "../../../services/bluetooth"

interface BluetoothDeviceProps {
    device: any
}

export default function BluetoothDevice({
    device,
}: BluetoothDeviceProps) {

    const connected = createBinding(device, "connected")
    const paired = createBinding(device, "paired")
    const name = createBinding(device, "name")

    return (
        <box
            spacing={10}
            valign={Gtk.Align.CENTER}
            cssClasses={["bt-device"]}
        >
            <label
                label={getDeviceIcon(device)}
            />

            <box
                orientation={Gtk.Orientation.VERTICAL}
                hexpand
            >
                <label
                    label={name.as((n: string | null) =>
                        n ?? "Unknown device"
                    )}
                    xalign={0}
                    cssClasses={["bt-device-name"]}
                />

                <label
                    label={connected.as((c: boolean) =>
                        c
                            ? "Connected"
                            : paired()
                                ? "Paired"
                                : "Available"
                    )}
                    xalign={0}
                    cssClasses={["bt-device-status"]}
                />
            </box>

            <box
                spacing={4}
                valign={Gtk.Align.CENTER}
                cssClasses={["bt-device-actions"]}
            >
                <button
                    cssClasses={["bt-action-button"]}
                    onClicked={() => {
                        if (connected())
                            disconnectDevice(device.address)
                        else
                            connectDevice(device.address)
                    }}
                >
                    <label
                        label={connected.as((c: boolean) =>
                            c
                                ? "󰂲"
                                : "󰂱"
                        )}
                    />
                </button>


                <button
                    cssClasses={["bt-action-button"]}
                    onClicked={() => {
                        if (!paired())
                            pairDevice(device.address)
                    }}
                >
                    <label
                        label={paired.as((p: boolean) =>
                            p
                                ? ""
                                : "󰂰"
                        )}
                    />
                </button>
                
                <button
                    cssClasses={["bt-action-button"]}
                    onClicked={() => {
                        removeDevice(device.address)
                    }}
                >
                    <label label="󰆴" />
                </button>
            </box>
        </box>
    )
}