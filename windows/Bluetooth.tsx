import { bluetoothOpen } from "../services/bluetooth"

import BluetoothList from "../widgets/barLeft/Bluetooth/BluetoothList"
import BluetoothHeader from "../widgets/barLeft/Bluetooth/BluetoothHeader"

import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"

export default function Bluetooth() {
    return (
        <window
            name="bluetooth"
            visible={bluetoothOpen}
            application={app}
            keymode={Astal.Keymode.ON_DEMAND}
        >
            <box
                orientation={1}
                spacing={10}
                cssClasses={["bluetooth-window"]}
            >
                <BluetoothHeader/>
                <BluetoothList />
            </box>
        </window>
    )
}