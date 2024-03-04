//import { env } from "process"

export const apiUrl = (location: string) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=65ad34ef51cc68f1567d459fc99efa63`
    
}

export const apiUrlForecast = (location: string) => (
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=65ad34ef51cc68f1567d459fc99efa63`
)