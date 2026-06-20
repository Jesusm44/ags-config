import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import Calendar from "./windows/Calendar"
import GLib from "gi://GLib"

GLib.spawn_command_line_async(
    "/home/jesusm/.config/ags/scripts/update-calendar.sh"
)

app.start({
  css: style,
  main() {
    app.get_monitors().map(Bar)

    Calendar()
  },
})


