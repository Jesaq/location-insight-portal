
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import FloodInfoCard from "@/components/FloodInfoCard";
import type { FloodData as FloodDataType } from "@/components/FloodInfoCard";

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

// Mock flood data - would be replaced with actual API data
const mockFloodData: Record<string, Record<string, FloodDataType[]>> = {
  "chennai": {
    "chembarambakkam": [
      {
        location: "Chembarambakkam Dam",
        date: "May 15, 2024",
        level: 3.2,
        maxLevel: 4.5,
        status: "normal",
        description: "Water level is within safe limits. No flood risk at present."
      },
      {
        location: "Kundrathur Area",
        date: "May 15, 2024",
        level: 1.8,
        maxLevel: 3.0,
        status: "normal",
        description: "Areas downstream from dam show normal water levels."
      }
    ],
    "puzhal": [
      {
        location: "Red Hills Reservoir",
        date: "May 15, 2024",
        level: 2.9,
        maxLevel: 3.5,
        status: "warning",
        description: "Water level is approaching caution levels. Monitor closely."
      }
    ],
    "adyar": [
      {
        location: "Adyar River",
        date: "May 15, 2024",
        level: 1.8,
        maxLevel: 3.0,
        status: "normal",
        description: "Current flow rates are normal. No flood warnings."
      }
    ],
    "velachery": [
      {
        location: "Velachery Lake",
        date: "May 15, 2024",
        level: 2.1,
        maxLevel: 2.5,
        status: "warning",
        description: "Recent rains have raised water levels. Some low-lying areas may experience minor water logging."
      },
      {
        location: "Taramani Zone",
        date: "May 15, 2024",
        level: 0.6,
        maxLevel: 1.0,
        status: "normal",
        description: "Normal water levels in canals and drainage systems."
      }
    ]
  },
  "bangalore": {
    "bellandur": [
      {
        location: "Bellandur Lake",
        date: "May 15, 2024",
        level: 1.8,
        maxLevel: 2.5,
        status: "warning",
        description: "Lake froth has increased due to recent rainfall. Surrounding areas should monitor conditions."
      }
    ],
    "hesaraghatta": [
      {
        location: "Hesaraghatta Lake",
        date: "May 15, 2024",
        level: 1.2,
        maxLevel: 2.0,
        status: "normal",
        description: "Water levels are stable. No flooding concerns."
      }
    ],
    "ulsoor": [
      {
        location: "Ulsoor Lake",
        date: "May 15, 2024",
        level: 1.5,
        maxLevel: 2.2,
        status: "normal",
        description: "Normal water levels with good outflow management."
      }
    ]
  },
  "hyderabad": {
    "hussain-sagar": [
      {
        location: "Hussain Sagar",
        date: "May 15, 2024",
        level: 2.8,
        maxLevel: 3.2,
        status: "warning",
        description: "Water levels elevated after recent rainfall. Monitoring recommended."
      }
    ],
    "osmansagar": [
      {
        location: "Osmansagar",
        date: "May 15, 2024",
        level: 2.2,
        maxLevel: 3.5,
        status: "normal",
        description: "Dam levels are within normal operating parameters."
      }
    ]
  }
};

const FloodData = () => {
  const { locationId, sublocationId } = useParams<{ locationId: string, sublocationId: string }>();
  const navigate = useNavigate();
  const [floodData, setFloodData] = useState<FloodDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const locationName = locationId && sublocationId 
    ? locationNames[locationId]?.[sublocationId] || `${sublocationId}, ${locationId}` 
    : "Selected Location";

  useEffect(() => {
    // Fetch flood data (mock data for now)
    if (locationId && sublocationId) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const data = mockFloodData[locationId]?.[sublocationId] || [];
        setFloodData(data);
        setIsLoading(false);
      }, 1000);
    }
  }, [locationId, sublocationId]);

  // Calculate overall flood status
  const getOverallStatus = (): 'normal' | 'warning' | 'danger' => {
    if (floodData.some(data => data.status === 'danger')) {
      return 'danger';
    } else if (floodData.some(data => data.status === 'warning')) {
      return 'warning';
    } else {
      return 'normal';
    }
  };

  const overallStatus = getOverallStatus();

  const getStatusColor = (status: 'normal' | 'warning' | 'danger') => {
    switch (status) {
      case 'normal':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-blue';
    }
  };

  const getStatusText = (status: 'normal' | 'warning' | 'danger') => {
    switch (status) {
      case 'normal':
        return 'Normal conditions - No flood risk';
      case 'warning':
        return 'Warning level - Monitor conditions';
      case 'danger':
        return 'Danger level - Flooding possible';
      default:
        return 'Unknown status';
    }
  };

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
          <h5 className="text-blue font-medium mb-2">Flood Information</h5>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-blue-dark">
            {locationName}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Current flood risk levels and historical flood data.
          </p>
        </div>

        {isLoading ? (
          <div className="glass-panel p-8 text-center animate-pulse-subtle">
            <p className="text-blue">Loading flood data...</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className={`glass-panel p-6 mb-8 border ${overallStatus === 'danger' ? 'border-red-300' : overallStatus === 'warning' ? 'border-yellow-300' : 'border-green-300'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-blue-dark">Overall Status</h3>
                <span className={`px-3 py-1 rounded-full text-sm text-white ${getStatusColor(overallStatus)}`}>
                  {getStatusText(overallStatus)}
                </span>
              </div>
              
              {overallStatus !== 'normal' && (
                <div className="p-4 rounded-lg bg-blue bg-opacity-5 border border-blue border-opacity-10 flex">
                  <AlertTriangle className="w-5 h-5 text-blue mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    {overallStatus === 'danger' 
                      ? 'Dangerous flood conditions detected. Take necessary precautions and follow local authority guidance.'
                      : 'Elevated water levels detected. Monitor local conditions and stay alert for updates.'}
                  </p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {floodData.map((data, index) => (
                <FloodInfoCard key={index} data={data} index={index} />
              ))}
              
              {floodData.length === 0 && (
                <div className="col-span-2 glass-panel p-8 text-center">
                  <p className="text-blue-dark">No flood data available for this location.</p>
                </div>
              )}
            </div>
            
            <div className="mt-12 glass-panel p-6 animate-in">
              <h3 className="section-title">About This Data</h3>
              <p className="text-gray-600 mb-4">
                Flood data is collected from various sources including government water management 
                authorities, real-time water level sensors, and meteorological forecasts. The data 
                is updated regularly to provide the most current information available.
              </p>
              
              <div className="mt-4">
                <h4 className="font-semibold text-blue-dark mb-2">Understanding Risk Levels</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-600">Normal: Safe conditions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
                    <span className="text-sm text-gray-600">Warning: Monitor closely</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-red-500"></span>
                    <span className="text-sm text-gray-600">Danger: Flood risk high</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloodData;
