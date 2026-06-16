import { execAsync } from "ags/process"

export default function Power() {
    return (
        <button onClicked={() => execAsync("systemctl poweroff")}>
            <label label="󰐥" />
        </button>
    )
}