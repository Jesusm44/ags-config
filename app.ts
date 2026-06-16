import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import Calendar from "./windows/Calendar"

app.start({
  css: style,
  main() {
    app.get_monitors().map(Bar)

    Calendar()
  },
})
