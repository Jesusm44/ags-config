import { createPoll } from "ags/time";

export const clockTime = createPoll(
    "", 1000, `date "+%I:%M:%S %P"`
)

export const bartime =  createPoll(
    "", 1000, `date "+%I:%M %p"`
)

export const barDate = createPoll(
    "", 60000, `date "+%a %d %b"`
)