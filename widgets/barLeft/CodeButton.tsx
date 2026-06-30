import GLib from "gi://GLib?version=2.0"

export default function CodeButton() {
    return(
        <button
            cssClasses={["bar-icon-button"]}
            onClicked={() => {
                GLib.spawn_command_line_async("code")
            }}
        >
            <label label = ""/>
        </button>
    )
}