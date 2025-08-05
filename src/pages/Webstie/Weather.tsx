import { useEffect, useState } from "react";
import useCitySearch, { CitySuggestion } from "../../hooks/UseCitySearch";
import UseFetchCurrentWeather from "../../hooks/UseFetchCurrentWeather";
import UseFetchWeeklyForecast from "../../hooks/useFetchWeeklyForecasts";
import CurrentWeatherForecast from "../../components/Website/CurrentWeatherForecast";
import WeeklyForecast from "../../components/Website/WeeklyForecast";
import LoaderCMS from "../../components/Loader";
import Error from "../../components/Error";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSelectedCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setSelectedCoords({ lat: 51.5074, lon: -0.1278 });
      }
    );
  }, []);

  const { results } = useCitySearch(query);
  const { weatherData, loading: currentLoading, error: currentError } = UseFetchCurrentWeather(selectedCoords);

  const { forecastData, loading: forecastLoading, error: forecastError } = UseFetchWeeklyForecast(selectedCoords);

  const isCurrentWeatherReady = weatherData && forecastData.length > 0;

  const handleCityClick = (city: CitySuggestion) => {
    setSelectedCoords({ lat: city.lat, lon: city.lon });
    setQuery("");
  };

  const loading = currentLoading || forecastLoading;
  const error = currentError || forecastError;

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
        {/* Loading */}
        {loading && <LoaderCMS textDark={true} />}

        {/* Error */}
        {error && <Error errorMessage="Error fetching weather data, please try again later." />}

        {/* Forecasts */}
        {!loading && !error && isCurrentWeatherReady && (
          <>
            <CurrentWeatherForecast current={weatherData} forecast={forecastData} />
            <WeeklyForecast data={forecastData} />
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
