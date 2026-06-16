import app from "ags/gtk4/app"
import { Astal, Gdk } from "ags/gtk4"

import Left from "./Left"
import Center from "./Center"
import Right from "./Right"

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const {TOP, LEFT, RIGHT} = Astal.WindowAnchor

    return (
        <window
            visible
            name="bar"
            class="BAR"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={app}
        >
            <centerbox>
                <box $type="start">
                    <Left/>
                </box>
                <box $type="center">
                    <Center/>
                </box>
                <box $type="end">
                    <Right/>
                </box>
            </centerbox>
        </window>
    )
}