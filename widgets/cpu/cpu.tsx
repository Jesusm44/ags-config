import { temperature } from "../../services/cpu";

export default function CpuWidget() {
    return(
        <box spacing={6}>
            <label label="󰔏" />
            <label 
                label={temperature(
                    (t) => `${t}°C`
                )}
            />
        </box>
    )
}