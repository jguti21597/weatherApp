import { LucideIcon } from "lucide-react";
import React from "react";

interface InfoCardProps {
  value: number;
  unit: string;
  icon: LucideIcon;
}

const InfoCard = ({ value, unit, icon: Icon }: InfoCardProps) => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <Icon strokeWidth={1.4} size={60} color="white" />
      <h1 className=" text-secondary font-bold text-2xl">
        {value ? value : 0}
        {unit}
      </h1>
    </div>
  );
};

export default InfoCard;
