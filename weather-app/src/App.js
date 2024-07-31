import React, { useState } from 'react';
import './css/App.css';
import './css/Calendar.css';
import './css/Table.css';
//Import Calendar and State drop-down menu
import Calendar from 'react-calendar';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import Weather from './components/Weather.js';

import mapKey from './api/MAP_API_KEY.js';

function App() {

	//Todays date
	const todaysDate = new Date();
	//Default position (Seattle Washington)
	const defaultPosition  = { lat: 47.62190104905558, lng: -122.33379948020307 };

	//The minimum date that can be selected. Yesterday based on todays date
	const minDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate()-1);
	//The date selected will be todays date by default
	//[variable, function] =useState() :Allows us to assign variables more than once to const value
	const [selectedDate, setSelectedDate] = useState(todaysDate);

	//The coordinates we will use
	const [coordinates, setCoordinates] = useState(defaultPosition);

	// State for forcing marker update. Key updates (increments) on every click, forcing marker to update with new 'key'
	const [key, setKey] = useState(0); 

	//Updates the tile class name for all tiles before today to be blanked and all other dates active
	const tileClassName = ({ date }) => {
		// Check if the date is yesterday or before
		if (date <= minDate) {
		//return 'before-min-date';
		return 'before-today';
		}

		//Date is an available date
		return null;
	};

	//When a date is selected, update the selected date
	const handleDateSelection= (selection) => {
		setSelectedDate(selection);
	};

	//When a area is selected, update the coordinates saved
	const handleCoordinateSelection = (selection) => {
		setCoordinates(selection);
		setKey(prevKey => prevKey + 1); // Force update by changing key

	};

	//Map Styling
	const mapContainerStyle = {
		width: '74.5%',
		height: '500px',
		margin: '20px auto'
	};


	return (
		
		<div className="App">
			<header>  Weather App </header>
			<h2> Please select desired date.</h2>
			<p> Valid dates are from today to 300 days in the future.</p>

			<div className='content'>
				{/*Create calendar that only allows selections of todays date and forward, no past dates*/}
				<div className='calendar-container'>
					<Calendar 
						minDate={todaysDate}
						minDetail='Month'
						calendarType='gregory'
						tileClassName={tileClassName}
						onChange = {handleDateSelection}
					/>
				</div>

				<div className='weather-container'>
					<h1> Date selected: {selectedDate.toDateString()}</h1>

					<Weather lat={coordinates.lat} lng ={coordinates.lng} 
							selectedDate = {selectedDate} today = {todaysDate}>
					</Weather>
				</div>
			</div>
			{/* Google Map */}
			<LoadScript googleMapsApiKey= {mapKey()}>
				<GoogleMap
					onClick={ev => {
						const newCoordinates = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
						handleCoordinateSelection(newCoordinates);
					}}
					mapContainerStyle={mapContainerStyle}
					center={coordinates}
					zoom={10}
				>
                    <Marker key={key} position={coordinates} />
					
				</GoogleMap>

			</LoadScript>
		</div>
	);
  
}

export default App;
