import Battery from "../widgets/baterry/Battery"
import NetworkWidget from "../widgets/network/Network"
import AudioWidget from "../widgets/audio/Audio"
import Power from "../widgets/power/Power"
import BrightnessWidget from "../widgets/brightness/Brightness"
import KeyboardWidget from "../widgets/keyboard/Keyboard"
import CpuWidget from "../widgets/cpu/cpu"

export default function Right(){
    return(
        <box spacing={10}>
            <BrightnessWidget/>
            <AudioWidget/>
            <KeyboardWidget/>
            <CpuWidget/>
            <Battery/>
            <NetworkWidget />
            <Power/>
        </box>
    )
}