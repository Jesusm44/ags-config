import Gtk from "gi://Gtk?version=4.0";

import { scanDevices } from "../../../services/bluetooth";

export default function BluetoothHeader() {
    return (
        <box 
            spacing={8}
            valign={Gtk.Align.CENTER}
        >
            <label
                hexpand
                xalign={0}
                label="Bluetooth"
            /> 
            <button
                cssClasses={["bt-icon-button"]}
                onClicked={scanDevices}
            >
                <label label="↻"/>
            </button>
        </box>
    )
}