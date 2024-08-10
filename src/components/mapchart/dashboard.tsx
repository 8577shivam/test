import React from 'react';
import LineGraph from './LineGraph';
import CovidMap from './CovidMap';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 bg-indigo-800">
      <LineGraph />
      <CovidMap />
    </div>
  );
};

export default Dashboard;
