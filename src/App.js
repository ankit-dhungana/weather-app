//import the images and use it here if needed

import { useEffect, useState } from "react";
import Descriptions from "./components/Descriptions";
import { getWeatherData } from "./weatherService";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchweatherData = async () => {
      const data = await getWeatherData("Chitawan", units);
      setWeatherData(data);
    };

    fetchweatherData();
  }, []);

  return (
    <div className="app">
      <div className="overlay">
        {weatherData && (
          <div className="container">
            <div className="section section__inputs">
              <input type="text" name="city" placeholder="Enter City" />
              <button>&#176;F</button>
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
