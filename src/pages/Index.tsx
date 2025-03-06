
import { useState, useEffect } from "react";
import LocationCard from "@/components/LocationCard";

// Sample location data - this would come from your API or database
const locationData = [
  {
    id: "chennai",
    name: "Chennai",
    description: "Major port city in South India with important water reservoirs",
    image: "/placeholder.svg"
  },
  {
    id: "bangalore",
    name: "Bangalore",
    description: "Tech hub with growing concerns about water bodies",
    image: "/placeholder.svg"
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    description: "Historic city with significant lakes and water systems",
    image: "/placeholder.svg"
  },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a bit of loading time to show animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white">
      <div className="page-container py-16">
        <div className={`text-center mb-12 ${isLoaded ? 'animate-in' : 'opacity-0'}`}>
          <h5 className="text-blue font-medium mb-2">Water Resource Management</h5>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-blue-dark">
            Location Insight Portal
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a location to explore environmental data, monitor water bodies, 
            and access critical information about weather and flood patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locationData.map((location, index) => (
            <LocationCard
              key={location.id}
              id={location.id}
              name={location.name}
              description={location.description}
              image={location.image}
              staggerIndex={Math.min(index + 1, 5)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
