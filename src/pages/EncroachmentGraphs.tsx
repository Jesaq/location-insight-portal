
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, HelpCircle } from "lucide-react";
import LineChart, { ChartDataPoint } from "@/components/LineChart";
import { getMockIndexData } from "@/utils/earthEngine";

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

const EncroachmentGraphs = () => {
  const { locationId, sublocationId } = useParams<{ locationId: string, sublocationId: string }>();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const locationName = locationId && sublocationId 
    ? locationNames[locationId]?.[sublocationId] || `${sublocationId}, ${locationId}` 
    : "Selected Location";

  useEffect(() => {
    // Fetch chart data (mock data for now)
    if (locationId && sublocationId) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const data = getMockIndexData(locationId, sublocationId);
        setChartData(data);
        setIsLoading(false);
      }, 1000);
    }
  }, [locationId, sublocationId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white">
      <div className="page-container py-16">
        <button
          onClick={() => navigate(`/encroachment/${locationId}/${sublocationId}`)}
          className="flex items-center text-blue hover:text-blue-light transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Encroachment Options
        </button>

        <div className="text-center mb-12 animate-in">
          <h5 className="text-blue font-medium mb-2">Statistical Analysis</h5>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-blue-dark">
            {locationName}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Year-on-year changes in water index and buildup index from 2015 to 2024.
          </p>
        </div>

        {isLoading ? (
          <div className="glass-panel p-8 text-center animate-pulse-subtle">
            <p className="text-blue">Loading chart data...</p>
          </div>
        ) : (
          <LineChart data={chartData} title="Water and Buildup Indices (2015-2024)" />
        )}

        <div className="mt-12 glass-panel p-6 animate-in">
          <h3 className="section-title">Understanding the Indices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-dark mb-2">Water Index (NDWI)</h4>
              <p className="text-gray-600">
                The Normalized Difference Water Index (NDWI) measures the presence of water in landscape.
                Higher values indicate more water surface area, while decreasing values over time may
                suggest water body shrinkage due to encroachment, drought, or other factors.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-dark mb-2">Buildup Index (NDBI)</h4>
              <p className="text-gray-600">
                The Normalized Difference Built-up Index (NDBI) identifies urban areas and built-up land.
                Increasing values indicate expansion of buildings, roads, and other urban infrastructure,
                potentially at the expense of natural areas including water bodies.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue bg-opacity-5 rounded-lg border border-blue border-opacity-10 flex">
            <HelpCircle className="w-5 h-5 text-blue mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              This analysis is powered by Google Earth Engine, which processes satellite data from multiple 
              sources including Landsat and Sentinel missions. The indices are calculated using 
              standardized remote sensing algorithms and represent average values for the selected area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncroachmentGraphs;
