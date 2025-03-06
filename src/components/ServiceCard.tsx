
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  staggerIndex?: number;
}

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  path, 
  staggerIndex = 0 
}: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`glass-card p-6 hover-lift cursor-pointer flex flex-col items-center text-center animate-in stagger-${staggerIndex}`}
      onClick={() => navigate(path)}
    >
      <div className="w-16 h-16 rounded-full bg-blue bg-opacity-10 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-blue" />
      </div>
      
      <h3 className="text-xl font-semibold text-blue-dark mb-2">{title}</h3>
      
      <p className="text-gray-600 text-sm flex-1">{description}</p>
      
      <button 
        className="mt-6 btn-primary py-2 w-full"
      >
        Select
      </button>
    </div>
  );
};

export default ServiceCard;
