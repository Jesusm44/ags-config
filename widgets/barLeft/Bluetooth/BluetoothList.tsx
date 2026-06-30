import Gtk from "gi://Gtk?version=4.0";
import { For } from "gnim";

import { devices } from "../../../services/bluetooth";
import BluetoothDevice from "./BluetoothDevice";


export default function BluetoothList() {
  return (
    <box
        orientation={Gtk.Orientation.VERTICAL}
        spacing={4}
    >
        <For each={devices}>
            {(device:any) => (
                <BluetoothDevice
                    device={device}
                />
            )}
        </For>
    </box>
  )
}