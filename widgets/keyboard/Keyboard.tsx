import { keyboardLayout } from "../../services/keyboard"

export default function KeyboardWidget() {
    return (
            <box spacing={7}>
                <label label="󰌌" />
                <label label={keyboardLayout} />
            </box>
    )
}