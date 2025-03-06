
import { WeatherData } from "@/components/WeatherDisplay";

const API_KEY = "4688ad73524f05eb18fa136409b2d99a";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

interface Location {
  name: string;
  lat: number;
  lon: number;
}

// This will be replaced by actual location data
export const locationCoordinates: Record<string, Record<string, Location>> = {
  "chennai": {
    "chembarambakkam": { name: "Chembarambakkam, Chennai", lat: 13.0827, lon: 80.0482 },
    "puzhal": { name: "Puzhal, Chennai", lat: 13.1617, lon: 80.1839 },
    "adyar": { name: "Adyar, Chennai", lat: 13.0012, lon: 80.2565 },
    "velachery": { name: "Velachery, Chennai", lat: 12.9815, lon: 80.2176 }
  },
  "bangalore": {
    "whitefield": { name: "Whitefield, Bangalore", lat: 12.9698, lon: 77.7499 },
    "electronic-city": { name: "Electronic City, Bangalore", lat: 12.8452, lon: 77.6602 },
    "koramangala": { name: "Koramangala, Bangalore", lat: 12.9279, lon: 77.6271 }
  }
};

export const fetchWeatherData = async (
  locationId: string,
  sublocationId: string
): Promise<WeatherData> => {
  try {
    const location = locationCoordinates[locationId]?.[sublocationId];
    
    if (!location) {
      throw new Error("Location not found");
    }
    
    const url = `${BASE_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    
    const data = await response.json();
    
    return {
      city: location.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      feelsLike: data.main.feels_like,
      pressure: data.main.pressure
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
