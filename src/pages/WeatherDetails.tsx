
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import WeatherDisplay, { WeatherData } from "@/components/WeatherDisplay";
import { fetchWeatherData } from "@/utils/weatherApi";
import { toast } from "sonner";

// Location names mapping
const locationNames: Record<string, Record<string, string>> = {
  "chennai": {
    "chembarambakkam": "Chembarambakkam, Chennai",
    "puzhal": "Puzhal, Chennai",
    "adyar": "Adyar, Chennai",
    "velachery": "Velachery, Chennai"
  },
  "bangalore": {
    "bellandur": "Bellandur Lake, Bangalore",
    "hesaraghatta": "Hesaraghatta Lake, Bangalore",
    "ulsoor": "Ulsoor Lake, Bangalore"
  },
  "hyderabad": {
    "hussain-sagar": "Hussain Sagar, Hyderabad",
    "osmansagar": "Osmansagar, Hyderabad"
  }
};

const WeatherDetails = () => {
  const { locationId, sublocationId } = useParams<{ locationId: string, sublocationId: string }>();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const locationName = locationId && sublocationId 
    ? locationNames[locationId]?.[sublocationId] || `${sublocationId}, ${locationId}` 
    : "Selected Location";

  useEffect(() => {
    const getWeatherData = async () => {
      if (!locationId || !sublocationId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchWeatherData(locationId, sublocationId);
        setWeatherData(data);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch weather data"));
        toast.error("Failed to load weather data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    getWeatherData();
  }, [locationId, sublocationId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white">
      <div className="page-container py-16">
        <button
          onClick={() => navigate(`/services/${locationId}/${sublocationId}`)}
          className="flex items-center text-blue hover:text-blue-light transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </button>

        <div className="text-center mb-12 animate-in">
          <h5 className="text-blue font-medium mb-2">Weather Information</h5>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-blue-dark">
            {locationName}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Current weather conditions and forecast.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <WeatherDisplay 
            data={weatherData} 
            isLoading={isLoading} 
            error={error} 
          />
          
          <div className="mt-12 glass-panel p-6 animate-in">
            <h3 className="section-title">Weather and Water Bodies</h3>
            <p className="text-gray-600 mb-4">
              Weather patterns directly impact water bodies and can influence flooding and drought conditions.
              Monitoring weather data alongside water body analysis provides a more complete picture of 
              environmental changes and potential risks.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="glass-card p-4">
                <h4 className="font-semibold text-blue-dark mb-2">Rainfall Impact</h4>
                <p className="text-sm text-gray-600">
                  Heavy rainfall can lead to rapid filling of reservoirs and potential flooding, while
                  prolonged dry periods can cause water body shrinkage and increase the risk of encroachment.
                </p>
              </div>
              
              <div className="glass-card p-4">
                <h4 className="font-semibold text-blue-dark mb-2">Temperature Effects</h4>
                <p className="text-sm text-gray-600">
                  Higher temperatures increase evaporation rates, potentially reducing water levels in
                  reservoirs and lakes. This can impact water availability and quality over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
