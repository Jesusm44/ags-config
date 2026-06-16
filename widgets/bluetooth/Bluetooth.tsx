import {
    powered,
    toggleBluetooth,
} from "../../services/bluetooth"

export default function BluetoothWidget() {
    return (
        <box spacing={8}>
            <label label="Bt" />

            <switch
                active={powered}
                onStateSet={() => {
                    toggleBluetooth()
                    return false
                }}
            />
        </box>
    )
}

