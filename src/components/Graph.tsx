"use client"

import { WeatherResponse } from '@/lib/types'
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface GraphProps {
    data: WeatherResponse
}


const Graph = ({data}: GraphProps) => {
  return (
    <div>
    <ResponsiveContainer className="mr-[1rem] flex items-center justify-center" width={350} height={130}>
        <BarChart className='flex overflow-hidden' width={10} height={250} data={data.list.slice(1, 8).map(item => {
          return {
            ...item,
            main: {
              ...item.main,
              temp: item.main.temp - 273
            },
            dt_txt: item.dt_txt.slice(11, 16),
          }
        })} >
            <XAxis stroke='white' strokeWidth={10} dataKey="dt_txt"/>
            <YAxis stroke='white' strokeWidth={2} type='number'/>
            <Tooltip  />
            <Bar barSize={15} dataKey="main.temp" fill="white"/>
            </BarChart>
    </ResponsiveContainer>
    </div>
    
  )
}

export default Graph