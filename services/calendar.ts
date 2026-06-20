import { createState } from "ags"

export const [calendarOpen, setCalendarOpen] =
    createState(false)

export function toggleCalendar() {
    setCalendarOpen(!calendarOpen())
}

export interface CalendarEvents {
    id: string
    title: string
    start: string
    end: string
}

//proof
export const [viewDate, setViewDate] =
    createState(new Date())
//
export const [selectedDate, setSelectedDate] =
    createState(new Date())

export const [editingEvent, setEditingEvent] = 
    createState<any | null>(null)

export function nextMonth() {
    const current = selectedDate()

    setSelectedDate(() =>
        new Date(
            current.getFullYear(),
            current.getMonth() + 1,
            1,
        ),
    )
}

export function previousMonth() {
    const current = selectedDate()

    setSelectedDate(() =>
        new Date(
            current.getFullYear(),
            current.getMonth() - 1,
            1,
        ),
    )
}


export const [monthSelectorOpen, setMonthSelectorOpen] =
    createState(false)

export const [yearSelectorOpen, setYearSelectorOpen] =
    createState(false)