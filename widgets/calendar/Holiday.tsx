import { createComputed } from "gnim";
import { selectedDate, } from "../../services/calendar"
import { isHoliday } from "../../services/holidays";
import Gtk from "gi://Gtk?version=4.0";

export default function Holiday() {
    const holiday = createComputed(() =>
        isHoliday(
            selectedDate().getFullYear(),
            selectedDate().getMonth(),
            selectedDate().getDate()
        )
    )

    return(
        <box
            visible={createComputed(() => !!holiday())}
            halign={Gtk.Align.CENTER}
        >
            <label 
                cssClasses={["holiday-label"]}
                label={createComputed(() => 
                    holiday()
                    ? `󰃭 ${holiday()!.name}`
                    : ""
                )}
            />
        </box>
    )
}