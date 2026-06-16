import Hyprland from "gi://AstalHyprland"
import { createBinding } from "ags"

const hyprland = Hyprland.get_default()

export default function Workspace() {
    const focusedWorkspace = createBinding(
        hyprland,
        "focusedWorkspace",
    )

    return (
        <button>
            <label
                label={focusedWorkspace.as(
                    ws => `${ws.id}`,
                )}
            />
        </button>
    )
}