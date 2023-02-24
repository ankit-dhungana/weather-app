//import the images and use it here if needed

import { useEffect, useState } from "react";
import Descriptions from "./components/Descriptions";
import { getWeatherData } from "./weatherService";
// import Wallpaper from "./components/Wallpaper";
import { getRandomWallpaper } from "./wallpaper";

function App() {
  const [city, setCity] = useState("Winnipeg");
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState("metric");
  const [wallpaperUrl, setWallpaperUrl] = useState(null);

  useEffect(() => {
    const fetchweatherData = async () => {
      const data = await getWeatherData(city, units);
      setWeatherData(data);
    };

    fetchweatherData();
  }, [units, city]);

  // useeffect method that will fetch 1 random wallpaper from unsplash
  useEffect(() => {
    const fetchWallpaper = async () => {
      const data = await getRandomWallpaper();
      setWallpaperUrl(data);
    };

    fetchWallpaper();
  }, []);

  const handelUnitsClick = (e) => {
    const button = e.currentTarget;
    const activeUnit = button.innerText.slice(1);

    const isCelsius = activeUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const keyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${wallpaperUrl})` }}>
      {/* style={{ backgroundImage: `url(${wallpaperUrl})` }} */}
      {/* <Wallpaper></Wallpaper> */}
      <div className="overlay">
        {weatherData && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={keyPressed}
                type="text"
                name="city"
                placeholder="Enter City"
              />
              <button onClick={(e) => handelUnitsClick(e)}>&#176;F</button>{" "}
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weatherData.name}, ${weatherData.country}`}</h3>
                <img src={weatherData.iconURL} alt="weather icon" />
                <h3>{weatherData.description}</h3>
              </div>
              <div className="temperature">
                <h1>
                  {" "}
                  {`${weatherData.temp.toFixed()}`} &#176;
                  {units === "metric" ? "C" : "F"}
                </h1>
              </div>
            </div>

            {/* bottom descritpion */}
            <Descriptions weather={weatherData} units={units}></Descriptions>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
