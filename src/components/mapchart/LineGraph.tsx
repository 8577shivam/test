// src/components/LineGraph.tsx
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useCovidHistoricalData } from '../../hooks/useCovidHistoricalData';
import { ChartData } from 'chart.js/auto';
import "chart.js/auto";
import { aggregateByMonth, aggregateByWeek } from '../../Utils/dateConverter';

// Utility to aggregate data by month


const LineGraph: React.FC = () => {
  const { data, isLoading, error } = useCovidHistoricalData();
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  if (isLoading) return <div className='flex justify-center text-3xl font-bold text-yellow-50'>Loading Line Chart...</div>;
  if (error) return <div>Error loading data</div>;

  let chartData: ChartData<'line'> = { labels: [], datasets: [] };

  if (data) {
    let cases = data.cases;
    let deaths = data.deaths;
    let recovered = data.recovered;

    if (timeFrame === 'monthly') {
      cases = aggregateByMonth(cases);
      deaths = aggregateByMonth(deaths);
      recovered = aggregateByMonth(recovered);
    } else if (timeFrame === 'weekly') {
      cases = aggregateByWeek(cases);
      deaths = aggregateByWeek(deaths);
      recovered = aggregateByWeek(recovered);
    }

    chartData = {
      labels: Object.keys(cases),
      datasets: [
        {
          label: 'Cases',
          data: Object.values(cases),
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
        {
          label: 'Deaths',
          data: Object.values(deaths),
          borderColor: 'rgba(255,99,132,1)',
          fill: false,
        },
        {
          label: 'Recovered',
          data: Object.values(recovered),
          borderColor: 'rgba(54,162,235,1)',
          fill: false,
        },
      ],
    };
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 bg-gray-800 p-4 rounded-md">
      <h2 className="text-center text-2xl font-bold mb-4 text-yellow-50">COVID-19 Cases Over Time</h2>
      <div className="flex justify-center mb-4">
        <button onClick={() => setTimeFrame('daily')} className={`mx-2 rounded-md p-2 ${timeFrame === 'daily' ? 'font-bold bg-blue-500' : 'bg-yellow-100'}`}>Daily</button>
        <button onClick={() => setTimeFrame('weekly')} className={`mx-2 rounded-md p-2 ${timeFrame === 'weekly' ? 'font-bold bg-blue-500' : 'bg-yellow-100'}`}>Weekly</button>
        <button onClick={() => setTimeFrame('monthly')} className={`mx-2 rounded-md p-2 ${timeFrame === 'monthly' ? 'font-bold bg-blue-500' : 'bg-yellow-100'}`}>Monthly</button>
      </div>
      <Line data={chartData} />
    </div>
  );
};

export default LineGraph;
