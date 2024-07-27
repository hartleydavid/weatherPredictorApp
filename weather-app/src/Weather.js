import weatherKey from './WEATHER_API_KEY.js';
import React, { useState, useEffect } from 'react';


function Weather(props){
    //Format and retreive the data for the API url
    const coordinates = `${props.lat},${props.lng}`;
    const date =  `${props.year}-${props.month + 2}-${props.date}`;
    const key = weatherKey();

    //API url
    const url = `http://api.weatherapi.com/v1/future.json?key=${key}&q=${coordinates}&dt=${date}`;

    //The JSON response data
    const [data, setData] = useState(null);

    //useEffect() call to fetch the data from the API
    useEffect(() => {
        fetch(url)
          .then(response => response.json())
          .then(json => setData(json))
          .catch(error => console.error(error));
      }, []);

    //const response = JSON.parse(data);

    return (

        <div name="Weather">

            {/*
                #Call the weather API
                    #Using the API key, coord string, date string
                #Parse the Response body 
                    #location:
                        #Name, region, country 
                    #forecast -> forecastday -> day
                        #Min and Max temperature
                        # -> condition
                            #Text, icon
            */}
            <h1> { data.location.name }, { data.location.region } </h1>
            <h1> Min: { data.forecast.forecastday[0].day.mintemp_f} </h1>
            <h1> Max: { data.forecast.forecastday[0].day.maxtemp_f} </h1>
            <h1> Avg: { data.forecast.forecastday[0].day.avgtemp_f} </h1>
            <h1> Text: { data.forecast.forecastday[0].day.condition.text} </h1>
            <h1> Text: { data.forecast.forecastday[0].day.condition.icon} </h1>
            



        </div>
    );
}

export default Weather;