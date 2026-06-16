import { clockTime } from "../../services/clock"

export default function Clock() {
    return (
        <label label={clockTime}/>
    )
}