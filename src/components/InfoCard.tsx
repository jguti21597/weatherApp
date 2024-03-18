import { LucideIcon } from "lucide-react";
import React from "react";

// Interface to define the props expected by the InfoCard component
interface InfoCardProps {
  value: number; // Numeric value to display, e.g., temperature, wind speed
  unit: string; // Unit of measurement for the value, e.g., "°C", "mph"
  icon: LucideIcon; // Lucide icon component to display alongside the value
}

// InfoCard component for displaying weather-related information
const InfoCard = ({ value, unit, icon: Icon }: InfoCardProps) => {
  return (
    // Container for the info card, designed to center its content
    <div className=" flex flex-col justify-center items-center">
      {/* Icon passed as a prop, with styling for stroke width, size, and color */}
      <Icon strokeWidth={1.4} size={60} color="white" />
      {/* Displaying the value and unit, ensuring a default value of 0 if none is provided */}
      <h1 className=" text-secondary font-bold text-2xl">
        {value ? value : 0}
        {unit}
      </h1>
    </div>
  );
};

export default InfoCard;
