import { LucideIcon } from 'lucide-react'
import React from 'react'

interface InfoCardProps {
    value: number,
    unit: string,
    icon: LucideIcon
}

const InfoCard = ({value, unit, icon: Icon}: InfoCardProps) => {
  return (
    <div className=' flex flex-col justify-center items-center'>
        <Icon size={90}/>
        <h1 className=' text-secondary font-extrabold text-2xl'>{value}{unit}</h1>
    </div>
  )
}

export default InfoCard