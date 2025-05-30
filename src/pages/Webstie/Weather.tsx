import useFetchCurrentWeather from "../../hooks/UseFetchCurrentWeather";
import useFetchWeeklyForecast from "../../hooks/UseFetchWeatherForecast";
import CurrentWeatherForecast from "../../components/Website/CurrentWeatherForecast";
import WeeklyForecast from "../../components/Website/WeeklyForecast";

const Weather = () => {
  const { weatherData } = useFetchCurrentWeather();
  const { forecastData } = useFetchWeeklyForecast();

  const isCurrentWeatherReady = weatherData && weatherData.main && weatherData.weather && weatherData.wind && weatherData.clouds;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center gap-y-4 mb-10">
        <h2 className="text-2xl select-none">Search your city below</h2>
        <div className="w-full max-w-sm relative">
          <input
            className="w-full bg-transparent placeholder:text-black text-black text-sm border border-black rounded-md px-3 py-2 focus:outline-none focus:border-black shadow-sm focus:shadow"
            placeholder="Type here..."
          />
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
