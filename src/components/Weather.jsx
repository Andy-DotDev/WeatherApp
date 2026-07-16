import { useState } from "react";

const Weather = () => {
  const api = {
    key: "1d0f5777aaa7cf5e2619bb3123f8d0cc",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${api.key}`,
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
                setQuery("");
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
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
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
        <div className="search-box">
          <input
            type="text"
            placeholder="Город"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            className="search-bar"
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Weather;
