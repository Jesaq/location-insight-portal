
import { Cloud, Droplets, Thermometer, Wind } from "lucide-react";

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  pressure: number;
}

interface WeatherDisplayProps {
  data: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

const WeatherDisplay = ({ data, isLoading, error }: WeatherDisplayProps) => {
  if (isLoading) {
    return (
      <div className="glass-panel p-8 animate-pulse text-center">
        <p className="text-blue">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel p-8 text-center border border-red-200">
        <p className="text-red-500">Error loading weather data: {error.message}</p>
        <button className="mt-4 btn-primary">Try Again</button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="glass-panel p-8 text-center">
        <p className="text-blue-dark">No weather data available</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 lg:p-8 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-center animate-in">
          <h2 className="text-2xl font-semibold text-blue-dark mb-1">{data.city}</h2>
          <div className="flex items-center mb-4">
            <img 
              src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} 
              alt={data.condition}
              className="w-16 h-16"
            />
            <span className="text-4xl font-semibold text-blue-dark">{Math.round(data.temperature)}°C</span>
          </div>
          <p className="text-blue capitalize mb-6">{data.condition}</p>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Thermometer className="w-4 h-4 mr-2 text-teal" />
            <span>Feels like: {Math.round(data.feelsLike)}°C</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 animate-in stagger-1">
          <div className="glass-card p-4 flex flex-col items-center justify-center">
            <Droplets className="w-6 h-6 text-blue mb-2" />
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="text-xl font-semibold text-blue-dark">{data.humidity}%</p>
          </div>
          
          <div className="glass-card p-4 flex flex-col items-center justify-center">
            <Wind className="w-6 h-6 text-blue mb-2" />
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="text-xl font-semibold text-blue-dark">{data.windSpeed} m/s</p>
          </div>
          
          <div className="glass-card p-4 flex flex-col items-center justify-center col-span-2">
            <Cloud className="w-6 h-6 text-blue mb-2" />
            <p className="text-sm text-gray-600">Pressure</p>
            <p className="text-xl font-semibold text-blue-dark">{data.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
