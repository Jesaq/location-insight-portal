
import { 
  ResponsiveContainer, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export interface ChartDataPoint {
  year: string;
  waterIndex: number;
  buildupIndex: number;
}

interface LineChartProps {
  data: ChartDataPoint[];
  title?: string;
}

const LineChart = ({ data, title }: LineChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="glass-panel p-8 text-center">
        <p className="text-blue-dark">No chart data available</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6">
      {title && <h3 className="text-xl font-semibold text-blue-dark mb-4 text-center">{title}</h3>}
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#1A3A54', fontSize: 12 }}
              tickLine={{ stroke: '#E2E8F0' }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis 
              tick={{ fill: '#1A3A54', fontSize: 12 }}
              tickLine={{ stroke: '#E2E8F0' }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
              itemStyle={{ fontWeight: 500 }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: 16 }}
            />
            <Line 
              type="monotone" 
              dataKey="waterIndex" 
              name="Water Index (NDWI)"
              stroke="#2D82B7" 
              strokeWidth={2}
              dot={{ fill: '#2D82B7', r: 4 }}
              activeDot={{ r: 6, fill: '#2D82B7', stroke: 'white', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="buildupIndex" 
              name="Buildup Index (NDBI)"
              stroke="#2AAA8A" 
              strokeWidth={2}
              dot={{ fill: '#2AAA8A', r: 4 }}
              activeDot={{ r: 6, fill: '#2AAA8A', stroke: 'white', strokeWidth: 2 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
