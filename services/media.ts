import { createPoll } from "ags/time"
import { createComputed } from "ags"

const media = createPoll(
    "",
    1000,
    `
playerctl --all-players metadata \
--format '{{status}}|{{playerName}}|{{artist}}|{{title}}' \
2>/dev/null
`
)

const data = createComputed(() => {
    const lines = media()
        .trim()
        .split("\n")
        .filter(Boolean)

    for (const line of lines) {
        const [status, player, artist, title] =
            line.split("|")

        if (status === "Playing") {
            return {
                status,
                player,
                artist,
                title,
            }
        }
    }

    if (lines.length > 0) {
        const [status, player, artist, title] =
            lines[0].split("|")

        return {
            status,
            player,
            artist,
            title,
        }
    }

    return {
        status: "Stopped",
        player: "",
        artist: "",
        title: "",
    }
})

export const mediaStatus = createComputed(
    () => data().status,
)

export const mediaPlayer = createComputed(
    () => data().player,
)

export const mediaArtist = createComputed(
    () => data().artist,
)

export const mediaTitle = createComputed(
    () => data().title,
)

export const mediaDisplay = createComputed(() => {
    const title = mediaTitle()

    if (title.length <= 25)
        return title

    return title.slice(0, 25) + "..."
})