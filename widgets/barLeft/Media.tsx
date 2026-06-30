import GLib from "gi://GLib?version=2.0"
import { createComputed } from "gnim"
import { mediaStatus, mediaDisplay } from "../../services/media"
import CavaBars from "./CavaBars"
import { Gtk } from "ags/gtk4"



export default function Media() {
    return (
        <box
            spacing={4}
            valign={Gtk.Align.CENTER}
        >
            <box
                spacing={0}
                valign={Gtk.Align.CENTER}
            >
                <button
                    cssClasses={["bar-icon-button"]}
                    onClicked={() => {
                        GLib.spawn_command_line_async(
                            "playerctl previous"
                        )
                    }}
                >
                    <label label="󰒫" />
                </button>

                <button
                    cssClasses={["bar-icon-button"]}
                    onClicked={() => {
                        GLib.spawn_command_line_async(
                            "playerctl play-pause"
                        )
                    }}
                >
                    <label
                        label={createComputed(() =>
                            mediaStatus() === "Playing"
                                ? "󰏤"
                                : "󰐊"
                        )}
                    />
                </button>

                <button
                    cssClasses={["bar-icon-button"]}
                    onClicked={() => {
                        GLib.spawn_command_line_async(
                            "playerctl next"
                        )
                    }}
                >
                    <label label="󰒬" />
                </button>
            </box>

            <box
                valign={Gtk.Align.CENTER}
                spacing={8}
            >
                <CavaBars
                    width={110}
                    height={30}
                />
                <label label={mediaDisplay} />
            </box>

            
        </box>
    )
}