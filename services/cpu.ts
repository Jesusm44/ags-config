import { createPoll } from "ags/time";
import { readFile } from "ags/file";

function getTemperature() {
    const raw = readFile(
        "/sys/class/hwmon/hwmon4/temp1_input"
    )

    return Math.round(Number(raw) / 1000)
}

export const temperature = createPoll(
    getTemperature(), 5000, () => getTemperature()
)