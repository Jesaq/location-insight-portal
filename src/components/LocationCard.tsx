
import { useNavigate, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";

interface LocationCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  staggerIndex?: number;
}

const LocationCard = ({ id, name, description, image, staggerIndex = 0 }: LocationCardProps) => {
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();

  const handleClick = () => {
    if (locationId) {
      // If we're in the sublocation selection page, navigate to services
      navigate(`/services/${locationId}/${id}`);
    } else {
      // If we're in the main locations page, navigate to sublocation selection
      navigate(`/location/${id}`);
    }
  };

  return (
    <div 
      className={`glass-card p-6 hover-lift cursor-pointer animate-in stagger-${staggerIndex}`}
      onClick={handleClick}
    >
      <div className="image-container mb-4 aspect-video">
        <img 
          src={image || "/placeholder.svg"} 
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-blue-dark mb-2 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-blue" />
        {name}
      </h3>
      
      <p className="text-gray-600 text-sm">{description}</p>
      
      <div className="mt-4 flex justify-end">
        <button className="text-blue font-medium text-sm flex items-center group">
          Select
          <svg
            className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
