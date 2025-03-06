
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import { ArrowLeft, Cloud, AlertCircle, BarChart2 } from "lucide-react";

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

const ServicesSelection = () => {
  const { locationId, sublocationId } = useParams<{ locationId: string, sublocationId: string }>();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a bit of loading time to show animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const locationName = locationId && sublocationId 
    ? locationNames[locationId]?.[sublocationId] || `${sublocationId}, ${locationId}` 
    : "Selected Location";

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white">
      <div className="page-container py-16">
        <button
          onClick={() => navigate(`/location/${locationId}`)}
          className="flex items-center text-blue hover:text-blue-light transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sublocations
        </button>

        <div className={`text-center mb-12 ${isLoaded ? 'animate-in' : 'opacity-0'}`}>
          <h5 className="text-blue font-medium mb-2">Selected Area</h5>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-blue-dark">
            {locationName}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a service to explore environmental data for this location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <ServiceCard
            icon={BarChart2}
            title="Encroachment Data"
            description="View satellite images and charts showing land use changes and water body encroachment over time."
            path={`/encroachment/${locationId}/${sublocationId}`}
            staggerIndex={1}
          />
          
          <ServiceCard
            icon={Cloud}
            title="Weather Details"
            description="Access real-time weather information including temperature, humidity, and forecasts."
            path={`/weather/${locationId}/${sublocationId}`}
            staggerIndex={2}
          />
          
          <ServiceCard
            icon={AlertCircle}
            title="Flood Data"
            description="Monitor flood risk levels, historical flood data, and current water levels."
            path={`/flood/${locationId}/${sublocationId}`}
            staggerIndex={3}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesSelection;
