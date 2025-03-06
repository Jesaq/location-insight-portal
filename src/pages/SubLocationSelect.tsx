
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LocationCard from "@/components/LocationCard";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Sample sublocation data - this would come from your API or database
const sublocationData: Record<string, Array<{
  id: string;
  name: string;
  description: string;
  image: string;
}>> = {
  "chennai": [
    {
      id: "chembarambakkam",
      name: "Chembarambakkam",
      description: "Major reservoir supplying water to Chennai city",
      image: "/placeholder.svg"
    },
    {
      id: "puzhal",
      name: "Puzhal",
      description: "Large lake also known as Red Hills Lake",
      image: "/placeholder.svg"
    },
    {
      id: "adyar",
      name: "Adyar",
      description: "River flowing through southern Chennai",
      image: "/placeholder.svg"
    },
    {
      id: "velachery",
      name: "Velachery",
      description: "Residential area with wetlands and lakes",
      image: "/placeholder.svg"
    }
  ],
  "bangalore": [
    {
      id: "bellandur",
      name: "Bellandur Lake",
      description: "Largest lake in Bangalore, facing significant pollution",
      image: "/placeholder.svg"
    },
    {
      id: "hesaraghatta",
      name: "Hesaraghatta Lake",
      description: "Man-made reservoir in the northwest of Bangalore",
      image: "/placeholder.svg"
    },
    {
      id: "ulsoor",
      name: "Ulsoor Lake",
      description: "Historic lake in central Bangalore",
      image: "/placeholder.svg"
    },
    {
      id: "whitefield",
      name: "Whitefield",
      description: "Major tech hub with several water bodies",
      image: "/placeholder.svg"
    },
    {
      id: "electronic-city",
      name: "Electronic City",
      description: "Tech district with surrounding water bodies",
      image: "/placeholder.svg"
    },
    {
      id: "koramangala",
      name: "Koramangala",
      description: "Upscale neighborhood with urban lakes",
      image: "/placeholder.svg"
    }
  ],
  "hyderabad": [
    {
      id: "hussain-sagar",
      name: "Hussain Sagar",
      description: "Heart-shaped lake built in 1563",
      image: "/placeholder.svg"
    },
    {
      id: "osmansagar",
      name: "Osmansagar",
      description: "Reservoir created by a dam across the Musi River",
      image: "/placeholder.svg"
    }
  ]
};

const locationNames: Record<string, string> = {
  "chennai": "Chennai",
  "bangalore": "Bangalore",
  "hyderabad": "Hyderabad"
};

const SubLocationSelect = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a bit of loading time to show animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Check if the locationId is actually a valid top-level location
  const isValidLocation = locationId && locationId in locationNames;
  
  // If not, it might be a sublocation ID, let's try to find its parent location
  const findParentLocation = (possibleSublocationId: string | undefined) => {
    if (!possibleSublocationId) return null;
    
    for (const [locationKey, sublocations] of Object.entries(sublocationData)) {
      const found = sublocations.find(sub => sub.id === possibleSublocationId);
      if (found) {
        return locationKey;
      }
    }
    return null;
  };
  
  // If locationId is not a valid top-level location, check if it's a sublocation
  const parentLocationId = isValidLocation ? locationId : findParentLocation(locationId);
  
  // Use the correct locationId (either direct or parent)
  const effectiveLocationId = parentLocationId || locationId;
  const sublocations = effectiveLocationId ? sublocationData[effectiveLocationId] || [] : [];
  const locationName = effectiveLocationId ? locationNames[effectiveLocationId] || effectiveLocationId : "";

  // If we detected a sublocation directly in the URL, inform the user
  useEffect(() => {
    if (parentLocationId && locationId && parentLocationId !== locationId) {
      toast({
        title: "Navigated to parent location",
        description: `Showing sublocations for ${locationNames[parentLocationId]}`,
        duration: 3000
      });
    }
  }, [locationId, parentLocationId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white">
      <div className="page-container py-16">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue hover:text-blue-light transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Locations
        </button>

        <div className={`text-center mb-12 ${isLoaded ? 'animate-in' : 'opacity-0'}`}>
          <h5 className="text-blue font-medium mb-2">Selected Region</h5>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-blue-dark">
            {locationName}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a specific area within {locationName} to explore detailed environmental data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sublocations.map((sublocation, index) => (
            <LocationCard
              key={sublocation.id}
              id={sublocation.id}
              name={sublocation.name}
              description={sublocation.description}
              image={sublocation.image}
              staggerIndex={Math.min(index + 1, 5)}
            />
          ))}
        </div>

        {sublocations.length === 0 && (
          <div className="text-center p-12 glass-panel">
            <p className="text-blue-dark">No sublocations found for this region.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubLocationSelect;
