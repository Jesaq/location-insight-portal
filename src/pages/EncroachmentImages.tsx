
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import { getSatelliteImageUrls } from "@/utils/earthEngine";

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

const EncroachmentImages = () => {
  const { locationId, sublocationId } = useParams<{ locationId: string, sublocationId: string }>();
  const navigate = useNavigate();
  const [images, setImages] = useState<{src: string; alt: string; year: string; category: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const locationName = locationId && sublocationId 
    ? locationNames[locationId]?.[sublocationId] || `${sublocationId}, ${locationId}` 
    : "Selected Location";

  useEffect(() => {
    // Fetch satellite images (mock data for now)
    if (locationId && sublocationId) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const imageData = getSatelliteImageUrls(locationId, sublocationId);
        setImages(imageData);
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
          <h5 className="text-blue font-medium mb-2">Satellite Imagery</h5>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-blue-dark">
            {locationName}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Historical satellite images showing changes in water bodies and urban development from 2018 to 2022.
          </p>
        </div>

        {isLoading ? (
          <div className="glass-panel p-8 text-center animate-pulse-subtle">
            <p className="text-blue">Loading satellite imagery...</p>
          </div>
        ) : (
          <ImageGallery images={images} />
        )}

        <div className="mt-12 glass-panel p-6 animate-in">
          <h3 className="section-title">Understanding the Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-dark mb-2">Image Categories</h4>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-medium text-blue-dark">Satellite:</span> Natural color satellite imagery</li>
                <li><span className="font-medium text-blue-dark">Water:</span> Water extent highlighted using NDWI index</li>
                <li><span className="font-medium text-blue-dark">Buildup:</span> Urban areas highlighted using NDBI index</li>
                <li><span className="font-medium text-blue-dark">Yearly Difference:</span> Changes between consecutive years</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-dark mb-2">Analysis Method</h4>
              <p className="text-gray-600">
                These images are processed using Google Earth Engine to highlight changes in water bodies
                and urban development over time. The analysis uses satellite data from Landsat 8 and Sentinel-2
                missions and applies specialized algorithms to detect changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncroachmentImages;
