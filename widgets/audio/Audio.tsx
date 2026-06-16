import { audioIcon, audioText } from "../../services/audio"

export default function AudioWidget() {
    return(
        <box spacing={4}>
            <label label={audioIcon}/>
            <label label={audioText}/>
        </box>
    )
}