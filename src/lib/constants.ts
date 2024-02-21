import { env } from "process"

export const apiUrl = (location: string) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${env.API_KEY}`
    
}

export const apiUrlForecast = (location: string) => (
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${env.API_KEY}`
)