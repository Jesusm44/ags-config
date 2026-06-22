import { createPoll } from "ags/time"
import { createComputed } from "ags"

export const weatherData = createPoll(
    "",
    900000,
    `curl -s "https://api.open-meteo.com/v1/forecast?latitude=-0.96006&longitude=-80.46895&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&hourly=precipitation_probability&timezone=auto&daily=weather_code,temperature_2m_max,temperature_2m_min"`
)


const current = createComputed(() => {
    try {
        return JSON.parse(weatherData()).current
    } catch {
        return null
    }
})

const weather = createComputed(() => {
    try {
        return JSON.parse(weatherData())
    } catch {
        return null
    }
})


export const temperature = createComputed(() => {
    const data = current()
    
    if(!data)
        return "--°C"
    return `${Math.round(data.temperature_2m)}°C`
})


export const humidity = createComputed(() => {
    const data = current()

    if (!data)
        return "--%"

    return `${data.relative_humidity_2m}%`
})

export const feelsLike = createComputed(() => {
    const data = current()

    if (!data)
        return "--°C"

    return `${Math.round(data.apparent_temperature)}°C`
})

export const wind = createComputed(() => {
    const data = current()

    if (!data)
        return "-- km/h"

    return `${Math.round(data.wind_speed_10m)} km/h`
})

export const condition = createComputed(() => {
    const data = current()

    if (!data)
        return "Uknown"

    switch (data.weather_code){
        case 0: return "Clear Sky ☀"
        case 1: return "Mainly Clear 🌤"
        case 2: return "Partly Cloudy "
        case 3: return "Overcast "

        case 45:
            case 48:
                return "Fog 🌫"
        
        case 51:
        case 53:
        case 55:
            return "Drizzle 🌦"

        case 61:
        case 63:
        case 65:
            return "Rain 🌧"

        case 71:
        case 73:
        case 75:
            return "Snow "

        case 80:
        case 81:
        case 82:
            return "Moderate Showers  "

        case 95:
            return "Thunderstorm "

        default:
            return "Uknown "
    }
}) 

export const rainChance = createComputed(() => {
    const data = weather()

    if(!data)
        return "--%"

    const currentHour = data.current.time.slice(0, 13)

    const index = data.hourly.time.findIndex(
        (time: string) => time.startsWith(currentHour)
    )

    if (index == -1)
        return "--%"

    return `${data.hourly.precipitation_probability[index]}%`
})

export interface ForecastDay {
    day: string
    max: number
    min: number
    icon: string
}

export const forecast = createComputed(() => {
    const data = weather()

    if(!data)
        return [] as ForecastDay[]


    const days = data.daily.time
    const maxTemps = data.daily.temperature_2m_max
    const minTemps = data.daily.temperature_2m_min
    const weatherCodes = data.daily.weather_code

    

    return days.slice(1, 6).map((date: string, index: number) => {
        const realIndex = index + 1 
        const day = new Date(date).toLocaleDateString("en-US", {
            weekday: "short"
        })
        
        const code = weatherCodes[realIndex]

        let icon = ""

        switch (code) {
            case 0:
                icon = "☀"
                break

            case 1:
                icon = ""
                break

            case 2:
                icon = "🌤"
                break

            case 3:
                icon = " "
                break

            case 45:
            case 48:
                icon = "🌫"
                break

            case 51:
            case 53:
            case 55:
                icon = "🌦"
                break

            case 61:
            case 63:
            case 65:
                icon = "🌧"
                break

            case 71:
            case 73:
            case 75:
                icon = ""
                break

            case 80:
            case 81:
            case 82:
                icon = " "
                break

            case 95:
                icon = ""
                break
        }
        return {
            day,
            max: Math.round(maxTemps[realIndex]),
            min: Math.round(minTemps[realIndex]),
            icon,
        }
    })
})