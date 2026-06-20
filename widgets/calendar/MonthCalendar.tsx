import { createComputed, For } from "gnim"
import {
    selectedDate,
    setSelectedDate,
    viewDate,
    setViewDate,
} from "../../services/calendar"
import { eventCountForDay, googleEvents} from "../../services/googleCalendar"
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

   const previousMonthDays = new Date(
        year,
        month,
        0,
   ).getDate()

   const cells = []

   for (
        let i = offset - 1;
        i >= 0;
        i --
   ){
    cells.push({
        day: previousMonthDays - i,
        currentMonth: false,
        monthOffset: -1,
    })
   }

   days.forEach(day => {
    cells.push({
        day,
        currentMonth: true,
        monthOffset: 0,
    })
   })

   let nextDay = 1

   while (cells.length < 42) {
    cells.push({
        day: nextDay++,
        currentMonth: false,
        monthOffset: 1,
    })
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

    const weeks = createComputed(() => {
        googleEvents()

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
            <box spacing={5} 
                halign={Gtk.Align.CENTER}
            >
                <box spacing={5} halign={Gtk.Align.CENTER}>
                    <button
                        onClicked={() => 
                            setViewDate(() =>
                                new Date(
                                    year(),
                                    month() - 1,
                                    1,
                                ),
                            )
                        }
                    >
                        <label label="" />
                    </button>

                    <label 
                        cssClasses={["calendar-month"]}
                        label={createComputed(() => months[month()])}
                    />
                </box>

                <button 
                    onClicked={() => 
                        setViewDate(() =>
                            new Date(
                                year(),
                                month() + 1,
                                1,
                            ),
                        )
                    }
                >
                    <label label=""/>
                </button>
                <box spacing={5}>
                    <button 
                        onClicked={() => 
                            setViewDate(() => 
                                new Date(
                                    year() - 1,
                                    month(),
                                    1,
                                ),
                            )
                        }
                    >
                        <label label = "" />
                    </button>
                    <label label={createComputed(() =>String(year()))}/>
                    <button
                        onClicked={() =>
                            setViewDate(() =>
                                new Date(
                                    year() + 1,
                                    month(),
                                    1,
                                ),
                            )
                        }
                    >
                        <label label=""/>
                    </button>    
                </box>
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
                            {week.map(day => {
                                const cellDate = new Date(
                                    year(),
                                    month() + day.monthOffset,
                                    day.day,
                                )
                                const isSelected = 
                                    cellDate.getDate() === selectedDate().getDate()
                                    && cellDate.getMonth() === selectedDate().getMonth()
                                    && cellDate.getFullYear() === selectedDate().getFullYear()

                                return(
                                    <button
                                        onClicked={() => {
                                            const selected = new Date(
                                                year(),
                                                month() + day.monthOffset,
                                                day.day
                                            )
                                            setSelectedDate(() => selected)
                                            setViewDate(() => selected)
                                        }}
                                    >
                                        <box orientation={1}>
                                            <label
                                                class={
                                                    isSelected
                                                        ? "calendar-selected-day"
                                                        : !day.currentMonth
                                                            ? "calendar-other-month"
                                                            :""
                                                }
                                                label={String(day.day)}
                                            />
                                            {day.currentMonth &&
                                                eventCountForDay(
                                                    cellDate.getFullYear(),
                                                    cellDate.getMonth(),
                                                    cellDate.getDate(),
                                                ) > 0 && (
                                                    <box
                                                        cssClasses={["event-bar"]}
                                                        visible={true}
                                                    />
                                                )
                                            }
                                        </box>
                                    </button>
                                )
                            })}
                        </box>
                    )}
                </For>
            </box>
        </box>
    )
}

