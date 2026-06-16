import { createComputed, For } from "gnim"
import {
    selectedDate,
    setSelectedDate,
    viewDate,
    setViewDate,
    setMonthSelectorOpen,
    monthSelectorOpen,
} from "../../services/calendar"
import { eventCountForDay } from "../../services/googleCalendar"
import { Gtk } from "ags/gtk4"


function buildCalendar(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()

    const daysInMonth = new Date(
        year,
        month + 1,
        0,
    ).getDate()

    const days = Array.from(
        { length: daysInMonth },
        (_, i) => i + 1,
    )

    const firstDay = new Date(year, month, 1)

    let offset = firstDay.getDay()

    offset = offset === 0 ? 6 : offset - 1

    const cells = [
        ...Array(offset).fill(""),
        ...days,
    ]

    while (cells.length < 42) {
        cells.push("")
    }

    return {
        year,
        month,
        cells,
    }
}

export default function MonthCalendar() {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]


    const calendarData = createComputed(() =>
        buildCalendar(viewDate()),
    )

    const year = createComputed(
        () => calendarData().year,
    )

    const month = createComputed(
        () => calendarData().month,
    )

     const monthName = createComputed(
        () => months[month()],
    )

    const cells = createComputed(
        () => calendarData().cells,
    )

    const weeks = createComputed(() => {
        const data = buildCalendar(viewDate())

        return [0, 1, 2, 3, 4, 5].map(week =>
            data.cells.slice(
                week * 7,
                week * 7 + 7,
            ),
        )
    })

    return (
        <box orientation={1} spacing={5} halign={Gtk.Align.CENTER}>
            <box orientation={1} halign={Gtk.Align.CENTER}>
                <button
                    onClicked={() => {
                        setMonthSelectorOpen(
                            !monthSelectorOpen(),
                        )
                    }}
                >
                    <label label={months[month()]} />
                </button>

                <box
                    orientation={1}
                    visible={monthSelectorOpen}
                >
                    {months.map((monthName, index) => (
                        <button
                            onClicked={() => {
                                setViewDate(() =>
                                    new Date(
                                        year(),
                                        index,
                                        1,
                                    ),
                                )
                                setMonthSelectorOpen(false)
                            }}
                        >
                            <label label={monthName} />
                        </button>
                    ))}
                </box>
                <button>
                    <label
                        label={createComputed(() =>
                            String(year()),
                        )}
                    />
                </button>
            </box>

             <box homogeneous>
                <label label="Mo" />
                <label label="Tu" />
                <label label="We" />
                <label label="Th" />
                <label label="Fr" />
                <label label="Sa" />
                <label label="Su" />    
            </box>

            <box orientation={1} halign={Gtk.Align.CENTER}>
                <For each={weeks}>
                    {(week) => (
                        <box homogeneous>
                            {week.map(day => (
                                <button
                                    onClicked={() => {
                                        if (day) {
                                            setSelectedDate(() =>
                                                new Date(
                                                    year(),
                                                    month(),
                                                    Number(day),
                                                ),
                                            )
                                        }
                                    }}
                                >
                                    <box orientation={1}>
                                        <label
                                            class={
                                                day === selectedDate().getDate()
                                                && month() === selectedDate().  getMonth()
                                                && year() === selectedDate().   getFullYear    ()
                                                    ? "calendar-selected-day"
                                                    : ""
                                            }
                                            label={String(day ?? "")}
                                        />
                                        {day &&
                                            eventCountForDay(
                                                year(),
                                                month(),
                                                Number(day),
                                            ) > 0 && (
                                                <box
                                                    cssClasses={["event-bar"]}
                                                />
                                            )
                                        }
                                    </box>
                                </button>
                            ))}
                        </box>
                    )}
                </For>
            </box>
        </box>
    )
}

