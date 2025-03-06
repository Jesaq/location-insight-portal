
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Image, BarChart2 } from "lucide-react";

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

const EncroachmentView = () => {
  const { locationId, sublocationId } = useParams<{ locationId: string, sublocationId: string }>();
  const navigate = useNavigate();

  const locationName = locationId && sublocationId 
    ? locationNames[locationId]?.[sublocationId] || `${sublocationId}, ${locationId}` 
    : "Selected Location";

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
          <h5 className="text-blue font-medium mb-2">Encroachment Analysis</h5>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-blue-dark">
            {locationName}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore encroachment data through satellite imagery or graphical analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div 
            className="glass-card p-6 hover-lift cursor-pointer flex flex-col items-center text-center animate-in stagger-1"
            onClick={() => navigate(`/encroachment/images/${locationId}/${sublocationId}`)}
          >
            <div className="w-16 h-16 rounded-full bg-blue bg-opacity-10 flex items-center justify-center mb-4">
              <Image className="w-8 h-8 text-blue" />
            </div>
            
            <h3 className="text-xl font-semibold text-blue-dark mb-2">Satellite Images</h3>
            
            <p className="text-gray-600 text-sm flex-1">
              View historical satellite imagery showing changes in water bodies and land use from 2018 to 2022.
            </p>
            
            <button className="mt-6 btn-primary py-2 w-full">
              View Images
            </button>
          </div>
          
          <div 
            className="glass-card p-6 hover-lift cursor-pointer flex flex-col items-center text-center animate-in stagger-2"
            onClick={() => navigate(`/encroachment/graphs/${locationId}/${sublocationId}`)}
          >
            <div className="w-16 h-16 rounded-full bg-blue bg-opacity-10 flex items-center justify-center mb-4">
              <BarChart2 className="w-8 h-8 text-blue" />
            </div>
            
            <h3 className="text-xl font-semibold text-blue-dark mb-2">Statistical Analysis</h3>
            
            <p className="text-gray-600 text-sm flex-1">
              Explore graphical charts showing water index and buildup index trends from 2015 to 2024.
            </p>
            
            <button className="mt-6 btn-primary py-2 w-full">
              View Charts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncroachmentView;
