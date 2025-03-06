
import { AlertCircle, Calendar, Droplet, MapPin } from "lucide-react";

export interface FloodData {
  location: string;
  date: string;
  level: number;
  maxLevel: number;
  status: 'normal' | 'warning' | 'danger';
  description: string;
}

interface FloodInfoCardProps {
  data: FloodData;
  index?: number;
}

const FloodInfoCard = ({ data, index = 0 }: FloodInfoCardProps) => {
  const getStatusColor = () => {
    switch (data.status) {
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

  const getStatusText = () => {
    switch (data.status) {
      case 'normal':
        return 'Normal';
      case 'warning':
        return 'Warning';
      case 'danger':
        return 'Danger';
      default:
        return 'Unknown';
    }
  };

  const percentLevel = (data.level / data.maxLevel) * 100;

  return (
    <div className={`glass-card p-6 animate-in`} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-blue-dark flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-blue" />
          {data.location}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
      
      <div className="mb-4 flex items-center text-sm text-gray-600">
        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
        <span>{data.date}</span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Water Level</span>
          <span className="text-sm font-medium text-blue-dark">
            {data.level.toFixed(1)} m / {data.maxLevel} m
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${data.status === 'danger' ? 'bg-red-500' : data.status === 'warning' ? 'bg-yellow-500' : 'bg-blue'}`}
            style={{ width: `${percentLevel}%` }}
          ></div>
        </div>
      </div>
      
      <div className="p-3 rounded-lg bg-blue bg-opacity-5 border border-blue border-opacity-10">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default FloodInfoCard;
