import "./App.css";
import React, { useState } from "react";


// function API code 2 different ways 
// 1st way
// const url = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=f765478da97b8124bef0c9d2cb6bcf12'

// or 2nd way define api object / base url is going to be this url that we are going to fetch from
const api = {
  key: "f765478da97b8124bef0c9d2cb6bcf12",
  base: "https://api.openweathermap.org/data/2.5/",
};

// Function to display temperature in Fahrenheit
const TemperatureFahrenheit = ({ temperature }) => {
  return <p>{temperature}°F</p>;
};

function App() {

  // hold state of search term
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  // store weather json object inside of our app/ as a state variable-usestate

  const searchPressed = () => {
    // console.log (searchPressed);
    console.log(search);

// fetch and get data from url
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
    .then((response) => response.json())
    .then((result) => {
    setData(result);

    console.log(result);
    })
    // handle the error 
    .catch((error) => {
    console.error("Error 404", error);
    });
  };

  return (

    <div className="App">

      <h1>Weather</h1>

    {/* Search Box */}
      <div>
        <input
          type="text"
          placeholder="Enter city"
          onChange={(e) => setSearch(e.target.value)}
          // when search change update search term 
        />

        <button onClick={searchPressed}>Search</button>
      </div>
{/* when reload check the weather.main is not equal undefined */}
      {/* Display weather information */}
      {data && data.main && data.weather ? (
        <div>
          {/* Location */}
          <p>{data.name}</p>

          {/* Temperature Fahrenheit */}
          <TemperatureFahrenheit
            temperature={(data.main.temp* 9) / 5 + 32}
          />
          <p>{data.main.humidity}%rh</p>

          {/* Weather Condition */}
          <p>{data.weather[0].main}</p>
          <p>{data.weather[0].description}</p>
        </div>
      ) 

      :(" ")}
    </div>


  );
}

export default App;

