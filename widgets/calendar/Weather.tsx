import {
    temperature,
    humidity,
    feelsLike,
    wind,
    condition,
    //conditionIcon
    rainChance
} from "../../services/weather"

export default function Weather() {
    return (
        <box
            orientation={1}
            spacing={4}
        >
            <label label={temperature(t => `󰔏 ${t}`)} />

            <label label={feelsLike(f => `󰈸: ${f}`)} />

            <label label={humidity(h => `󰖌 ${h}`)} />

            <label label={wind(w => `󰖝: ${w}`)} />
            
            <label label= {condition}/>

            <label label={rainChance(r => `  ${r}`)} />
        </box>
    )
}