import { useState } from "react";
import useCitySearch, { CitySuggestion } from "../../hooks/UseCitySearch";
import useFetchCurrentWeather from "../../hooks/UseFetchCurrentWeather";
import useFetchWeeklyForecast from "../..//hooks/UseFetchWeatherForecast";
import CurrentWeatherForecast from "../../components/Website/CurrentWeatherForecast";
import WeeklyForecast from "../../components/Website/WeeklyForecast";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lon: number }>({
    lat: 50.3167,
    lon: 19.0833,
  });

  const { results } = useCitySearch(query);
  const { weatherData } = useFetchCurrentWeather(selectedCoords);
  const { forecastData } = useFetchWeeklyForecast(selectedCoords);

  const isCurrentWeatherReady = weatherData && weatherData && weatherData && weatherData && weatherData;

  const handleCityClick = (city: CitySuggestion) => {
    setSelectedCoords({ lat: city.lat, lon: city.lon });
    setQuery("");
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center gap-y-4 mb-10">
        <h2 className="text-2xl select-none">Search your city below</h2>
        <div className="w-full max-w-sm relative">
          <input
            className="w-full bg-transparent placeholder:text-black text-black text-sm border border-black rounded-md px-3 py-2 focus:outline-none focus:border-black shadow-sm focus:shadow"
            placeholder="Type here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {results.length > 0 && (
            <ul className="absolute bg-white text-black w-full border mt-1 rounded shadow z-10 max-h-60 overflow-y-auto">
              {results.map((city, idx) => (
                <li key={idx} onClick={() => handleCityClick(city)} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  {city.name}
                  {city.state ? `, ${city.state}` : ""}
                  {`, ${city.country}`}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="py-20 w-4/5 flex flex-wrap gap-y-10 items-stretch mx-auto">
        {isCurrentWeatherReady && <CurrentWeatherForecast current={weatherData} forecast={forecastData} />}
        {Array.isArray(forecastData) && forecastData.length > 0 && <WeeklyForecast data={forecastData} />}
      </div>
    </div>
  );
};

export default Weather;
