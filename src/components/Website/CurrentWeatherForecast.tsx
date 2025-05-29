import React from "react";
import icon from "../../../public/weather-icons/01d.png";

const CurrentWeatherForecast = () => {
  return (
    <div className="w-1/2 border-2">
      <div>
        <h1 className="text-2xl text-center font-semibold">CURRENT WEATHER</h1>
        <ul className="flex justify-between items-center text-center">
          <li className="flex flex-col gapy-2 font-semibold">
            KATOWICE, PL
            <span className="font-thin">Today 29 may</span>
          </li>
          <li className="flex flex-col gapy-2 font-semibold">
            13C
            <span className="font-thin">overcast clouds</span>
          </li>
          <li>
            <img src={icon} alt="" className="w-[60px]"/>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CurrentWeatherForecast;
