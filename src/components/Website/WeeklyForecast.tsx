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

type WeeklyForecastProps = {
  data: ForecastItem[];
};

const WeeklyForecast = ({ data }: WeeklyForecastProps) => {
  return (
    <div className="w-1/2 select-none flex flex-col gap-y-10 max-[850px]:w-full">
      <h1 className="text-xl text-center font-semibold mb-10">WEEKLY FORECAST</h1>
      <ul className="flex flex-col gap-y-4">
        {data.slice(0, 6).map((item, index) => {
          const date = new Date(item.dt_txt);
          const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

          return (
            <li key={index} className="border w-full rounded-xl flex flex-wrap p-2">
              <p className="w-1/3 font-bold text-center">{dayName}</p>
              <p className="flex items-center w-1/3 font-semibold justify-center">🌡 {item.main.temp.toFixed(1)}°C</p>
              <p className="flex items-center w-1/3 font-semibold justify-center">💨 {item.wind.speed} m/s</p>
              <p className="w-1/3 justify-center flex items-center text-xs font-thin break-after-column gap-x-2">
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  className="w-[40px] bg-gray-300 rounded-xl"
                  alt="weather icon"
                  loading="lazy"
                />
                {item.weather[0].description}
              </p>
              <p className="flex items-center w-1/3 font-semibold justify-center">☁️ {item.clouds.all}%</p>
              <p className="flex items-center w-1/3 font-semibold justify-center">💧 {item.main.humidity}%</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WeeklyForecast;
