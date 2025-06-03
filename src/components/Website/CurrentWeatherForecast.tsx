type ForecastItem = {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
};

type CurrentWeatherForecastProps = {
  current: {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    clouds: {
      all: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  };
  forecast: ForecastItem[];
};

const CurrentWeatherForecast = ({ current, forecast }: CurrentWeatherForecastProps) => {
  const today = new Date();
  const currentDate = `${today.getDate()}/${today.getMonth() + 1}`;
  const weatherIcon = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

  const todayForecast = forecast.slice(0, 4);

  return (
    <div className="w-1/2 select-none flex flex-col gap-y-10 max-[850px]:w-full justify-between">
      <div>
        <h1 className="text-2xl text-center font-semibold mb-10">CURRENT WEATHER</h1>
        <ul className="flex justify-around items-center text-center">
          <li className="flex flex-col gap-2 font-semibold">
            {current.name}
            <span className="font-thin">Today, {currentDate}</span>
          </li>
          <li className="flex flex-col gap-2 font-semibold">
            {Math.round(current.main.temp)}°C
            <span className="font-thin capitalize">{current.weather[0].description}</span>
          </li>
          <li>
            <img src={weatherIcon} alt="Weather icon" className="w-[60px] bg-gray-300 rounded-xl" />
          </li>
        </ul>
      </div>

      <div>
        <h1 className="text-2xl text-center font-semibold mb-10">Air Conditions</h1>
        <ul className="flex justify-around items-center text-center text-lg">
          <li className="flex flex-col gap-2 font-semibold">
            <span className="font-thin">Real feel</span>
            {Math.round(current.main.feels_like)}°C
          </li>
          <li className="flex flex-col gap-2 font-semibold">
            <span className="font-thin">Wind</span>
            {current.wind.speed} m/s
          </li>
          <li className="flex flex-col gap-2 font-semibold">
            <span className="font-thin">Clouds</span>
            {current.clouds.all}%
          </li>
          <li className="flex flex-col gap-2 font-semibold">
            <span className="font-thin">Humidity</span>
            {current.main.humidity}%
          </li>
        </ul>
      </div>

      <div>
        <h1 className="text-2xl text-center font-semibold mb-10">Today's Forecast</h1>
        <ul className="flex justify-center gap-x-2 items-center text-center text-lg">
          {todayForecast.map((item, index) => {
            const time = new Date(item.dt_txt).getHours();
            const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
            return (
              <li key={index} className="flex flex-col gap-2 font-semibold justify-center items-center p-4 rounded-xl border">
                <span className="font-thin">{`${time}:00`}</span>
                <img src={iconUrl} alt="Forecast icon" className="w-[40px] bg-gray-300 rounded-xl" />
                <span>{Math.round(item.main.temp)}°C</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CurrentWeatherForecast;
