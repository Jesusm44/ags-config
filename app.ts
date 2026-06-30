import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widgets/Bar"
import Calendar from "./windows/Calendar"
import GLib from "gi://GLib"
import { startNotifications }
    from "./services/notifications"

GLib.spawn_command_line_async(
    "/home/jesusm/.config/ags/scripts/update-calendar.sh"
)
import Bluetooth from "./windows/Bluetooth"


app.start({
  css: style,
  main() {
    app.get_monitors().map(Bar)

    startNotifications()
    Calendar()
    Bluetooth()
  },
})