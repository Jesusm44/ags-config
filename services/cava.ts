import { createSubprocess } from "ags/process"

export const cava = createSubprocess(
    [] as number[],
    [
        "cava",
        "-p",
        `${SRC}/Backend/cava.config`,
    ],
    (stdout) =>
        stdout
            .trim()
            .split(";")
            .filter(v => v !== "")
            .map(v => Number(v) / 100),
)