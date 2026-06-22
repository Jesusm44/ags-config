import Gio from "gi://Gio?version=2.0";
import { createState } from "ags";

export interface Holiday {
    date: string
    name: string
    englishName: string
    countryCode: string
    global: boolean
}

const [holidays, setHolidays] = 
    createState<Holiday[]>([])

function loadHolidays(): void{
    try {
        const file= Gio.file_new_for_path(
            "/tmp/holidays.json"
        )

        const [, bytes] = 
            file.load_contents(null)

        const content = 
            new TextDecoder().decode(bytes)

        setHolidays(
            JSON.parse(content)
        )
    } catch {
        setHolidays([])
    }
}

loadHolidays()

const file = Gio.file_new_for_path(
    "/tmp/holidays.json"
)

const monitor = file.monitor_file(
    Gio.FileMonitorFlags.NONE,
    null
)

monitor.connect("changed", () => {
    loadHolidays()
})

export { holidays, loadHolidays}

export function isHoliday(
    year: number,
    month: number,
    day: number,
): Holiday | null {
    return(
        holidays().find((holiday) => {
            const date = new Date(holiday.date)

            return(
                date.getFullYear() === year &&
                date.getMonth() === month &&
                date.getDate() === day
            )
        }) ?? null
    )
}