import { useState } from "react";
import Search from "./Search";
import Location from "./Location";

const Weather = () => {
  const api = {
    key: "1d0f5777aaa7cf5e2619bb3123f8d0cc",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [weather, setWeather] = useState({});
  const searchCity = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=${api.key}`,
      )
        .then((res) => res.json())
        .then((geoData) => {
          if (geoData.length === 0) {
            alert("Город не найден!");
            return;
          }

          const { lat, lon } = geoData[0];

          return fetch(
            `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`,
          )
            .then((res) => res.json())
            .then((result) => {
              if (result.cod === 200) {
                setWeather(result);
                setSearchQuery("");
              } else {
                alert("Ошибка! Попробуйте снова");
              }
            });
        })
        .catch((err) => console.log(err));
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    let days = [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      "Воскресенье",
    ];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app night"
            : "app"
          : "app"
      }
    >
      <main>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchCity={searchCity}
        />
        <Location weather={weather} dateBuilder={dateBuilder} />
      </main>
    </div>
  );
};

export default Weather;
