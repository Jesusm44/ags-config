import Home from "../widgets/home/Home"
import Bash from "../widgets/bash/Bash"
import Workspace from "../widgets/workspace/Workspace"
import Bluetooth from "../widgets/bluetooth/Bluetooth"
import Cava from "../widgets/cava/Cava"

export default function Left() {
    return (
        <box spacing={12}>
            <Home />
            <Bash />
            <Workspace />
            <Bluetooth />
            <Cava />
        </box>
    )
}