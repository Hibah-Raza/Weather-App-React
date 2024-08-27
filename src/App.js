import React, {useState, useEffect} from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [unit, setUnit] = useState("metric");
  const [country, setCountry] = useState('');

  useEffect(() => {
    const getUserCountry = async () => {
      try {
        const response = await axios.get("https://ipinfo.io?token=7ca1d134716633");
        const userCountry = response.data.country;
        setUnit(userCountry === "Canada" ? "imperial" : "metric");
      } catch (error) {
        console.error("Error Fetching:", error);
      }
    };
    getUserCountry();
  }, []);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=a4b29878dfc63fb2505652f803a327d0`

  const searchLocation = (event) =>{
    if (event.key === 'Enter'){
      axios.get(url).then((response)=> {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text"/>
      </div>
      <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()}°{unit === "metric" ? "C" : "F"}</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>

      {data.name != undefined &&
      <div className="bottom">
      <div className="feels">
        {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°{unit === "metric" ? "C" : "F"}</p> : null}
        <p>Feels Like</p>
      </div>
      <div className="humidity">
        {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
        <p>Humidity</p>
      </div>
      <div className="wind">
        {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} {unit === "metric" ? "M/S" : "MPH"}</p> : null}
        <p>Wind Speed</p>
      </div>
    </div>
      } 
      </div>
    </div>
  );
}

export default App;
