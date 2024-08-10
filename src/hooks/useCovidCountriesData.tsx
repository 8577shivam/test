import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface CountryInfo {
  _id: number;
  lat: number;
  long: number;
  flag: string;
}

interface CountryData {
  country: string;
  countryInfo: CountryInfo;
  active: number;
  recovered: number;
  deaths: number;
}

const fetchCovidCountriesData = async (): Promise<CountryData[]> => {
  const { data } = await axios.get<CountryData[]>('https://disease.sh/v3/covid-19/countries');
  return data;
};

export const useCovidCountriesData = () => {
  return useQuery({
    queryKey:['covidCountriesData'], 
    queryFn:fetchCovidCountriesData

});
};