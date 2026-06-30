import Gtk from "gi://Gtk?version=4.0"

import {
    powered,
    toggleBluetooth,
    toggleBluetoothWindow,
} from "../../../services/bluetooth"

export default function BluetoothBar() {
    return (
        <box
            spacing={4}
            valign={Gtk.Align.CENTER}
        >
            <button
                cssClasses={["bar-icon-button"]}
                onClicked={toggleBluetoothWindow}
            >
                <label label="Bt" />
            </button>

            <switch
                valign={Gtk.Align.CENTER}
                active={powered}
                onStateSet={() => {
                    toggleBluetooth()
                    return false
                }}
            />
        </box>
    )
}