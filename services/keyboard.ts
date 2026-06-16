import { createPoll } from "ags/time"
import { exec } from "ags/process"

function getKeyboardLayout() {
    try {
        const json = JSON.parse(
            exec("hyprctl devices -j"),
        )

        const keyboard = json.keyboards.find(
            (kb: any) => kb.main,
        )

        if (!keyboard)
            return "??"

        const layouts = keyboard.layout
            .split(",")
            .map((layout: string) =>
                layout.trim().toLowerCase(),
            )

        const active =
            layouts[keyboard.active_layout_index]

        switch (active) {
            case "us":
                return "English"

            case "latam":
                return "Spanish"

            default:
                return active.toUpperCase()
        }
    } catch {
        return "??"
    }
}

export const keyboardLayout = createPoll(
    getKeyboardLayout(),
    1000,
    getKeyboardLayout,
)