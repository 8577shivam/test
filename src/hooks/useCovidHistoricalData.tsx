import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface HistoricalData {
  cases: { [date: string]: number };
  deaths: { [date: string]: number };
  recovered: { [date: string]: number };
}

const fetchCovidHistoricalData = async (): Promise<HistoricalData> => {
  const { data } = await axios.get<HistoricalData>(
    'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
  );
  return data;
};

export const useCovidHistoricalData = () => {
  return useQuery({
    queryKey: ['covidHistoricalData'],  // The unique key for caching and invalidation
    queryFn: fetchCovidHistoricalData,  // The function that fetches the data
  });
};