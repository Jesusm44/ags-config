import Workspace from "./barLeft/Workspace"
import Bluetooth from "./barLeft/Bluetooth/BluetoothBar"
import HomeButton from "./barLeft/HomeButton"
import CodeButton from "./barLeft/CodeButton"
import TerminalButton from "./barLeft/TerminalButton"
import Media from "./barLeft/Media"


export default function Left() {
    return (
        <box spacing={12}>
            <HomeButton/>
            <TerminalButton/>
            <CodeButton/>
            <Workspace />
            <Bluetooth />
            <Media/>
        </box>
    )
}

