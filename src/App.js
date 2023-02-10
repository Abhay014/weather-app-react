import React, { useState} from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('');
  
  const geoCodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=25e98025b90ce709f733b7187d59eeef`
  
  const getCord = async (event) => {    
    
  
    if (event.key == 'Enter') {
      
     const cord= await fetch(geoCodeUrl)
               .then(response => {
                 // setData(response.data)
                 return response.json()
               })
        // .then(data1 => {
        //     console.log(data1);
        //        })
        .catch((error) => {
        console.error('Error:', error)
        });
      
      
      const lat = cord[0].lat;
      const lon = cord[0].lon;
      console.log(lat, lon);
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=25e98025b90ce709f733b7187d59eeef`

     

      const weatherDetails =await fetch(weatherUrl)
      .then(response => {
        
        return response.json()
      })
      // .then(data1 => {
      //     console.log(data1);
      //        })
      .catch((error) => {
      console.error('Error:', error)
      });
      

      console.log(weatherDetails.name)
      //setData({})
      const details = JSON.parse(JSON.stringify(weatherDetails))
      console.log(details.name)
     await setData(details);
      console.log(data.name)
      setLocation('');
    
      
    }
    
  }
   

   
  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress ={getCord}
          placeholder="Enter Location"
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{ data.name}</p>
            
          </div>
          <div className="temp">
          {data.main ? <h1 className="bold">{ data.main.temp}°F</h1>:null}
            
            {/* <h1>{data.main.temp}°F</h1> */}

          </div>
          <div className="description">
            {data.weather ? <p>{ data.weather[0].main}</p>:null}
            {/* <p>Cloud</p> */}
          </div>
        </div>

        {data.name !=undefined && <div className="bottom"> 
          <div className="feels">
            {/* <p className="bold">65°F</p> */}
            {data.main ? <p className="bold">{ data.main.feels_like}°C</p>: null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className="bold">{ data.main.humidity}%</p>: null}
            
            {/* <p className="bold">20%</p> */}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className="bold">{ data.wind.speed}MPH</p>: null}
            
            {/* <p className="bold"> 12 MPH</p> */}
            <p>Wind Speed</p>
          </div>
          
        </div> }
        
      </div>
    </div>
  );
}

export default App;
