
import { ChartDataPoint } from "@/components/LineChart";

// This is a placeholder for the Earth Engine integration
// In a real implementation, this would connect to Google Earth Engine
// and fetch the actual NDWI and NDBI data

// Placeholder data for development and testing
export const getMockIndexData = (
  locationId: string,
  sublocationId: string
): ChartDataPoint[] => {
  // These are mock values - in a real implementation, these would come from Earth Engine
  const baseData = [
    { year: "2015", waterIndex: 0.42, buildupIndex: 0.18 },
    { year: "2016", waterIndex: 0.40, buildupIndex: 0.21 },
    { year: "2017", waterIndex: 0.38, buildupIndex: 0.25 },
    { year: "2018", waterIndex: 0.35, buildupIndex: 0.29 },
    { year: "2019", waterIndex: 0.34, buildupIndex: 0.32 },
    { year: "2020", waterIndex: 0.32, buildupIndex: 0.36 },
    { year: "2021", waterIndex: 0.31, buildupIndex: 0.39 },
    { year: "2022", waterIndex: 0.29, buildupIndex: 0.42 },
    { year: "2023", waterIndex: 0.27, buildupIndex: 0.45 },
    { year: "2024", waterIndex: 0.25, buildupIndex: 0.48 },
  ];

  // Modify the base data based on location to simulate different trends
  // This would be replaced by actual data from Earth Engine
  if (locationId === "chennai") {
    if (sublocationId === "chembarambakkam") {
      return baseData.map(item => ({
        ...item,
        waterIndex: item.waterIndex * 1.2,
        buildupIndex: item.buildupIndex * 0.9
      }));
    } else if (sublocationId === "puzhal") {
      return baseData.map(item => ({
        ...item,
        waterIndex: item.waterIndex * 0.9,
        buildupIndex: item.buildupIndex * 1.1
      }));
    }
  } else if (locationId === "bangalore") {
    return baseData.map(item => ({
      ...item,
      waterIndex: item.waterIndex * 0.8,
      buildupIndex: item.buildupIndex * 1.3
    }));
  }

  return baseData;
};

// This would be replaced by the actual integration with Earth Engine
export const getEarthEngineScriptLink = (): string => {
  return "#";
};

export const getSatelliteImageUrls = (
  locationId: string,
  sublocationId: string
): {src: string; alt: string; year: string; category: string}[] => {
  // This is a placeholder that would be replaced with actual satellite imagery
  // In a real implementation, these images would come from Earth Engine or another source
  const placeholders = [];
  
  const categories = ["Satellite", "Water", "Buildup", "Yearly Difference"];
  const years = ["2018", "2019", "2020", "2021", "2022"];
  
  // Generate placeholder images for each category and year
  categories.forEach(category => {
    years.forEach(year => {
      placeholders.push({
        src: "/placeholder.svg",
        alt: `${category} image from ${year}`,
        year,
        category
      });
    });
  });
  
  return placeholders;
};
