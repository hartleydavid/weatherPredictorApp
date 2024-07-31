import React, { useState } from 'react';
//Import CSS files
import './css/App.css';
import './css/Calendar.css';
import './css/Table.css';

//Import Calendar 
import Calendar from 'react-calendar';
//Map imports
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import mapKey from './api/MAP_API_KEY.js'; //API key for map

//Components
import Weather from './components/Weather.js';


function App() {

	
	const todaysDate = new Date(); //Todays date
	
	const defaultPosition  = { //Default position (Seattle Washington)
		lat: 47.62190104905558, 
		lng: -122.33379948020307 
	};

	const minDate = new Date( //The minimum date that can be selected. Yesterday based on todays date
		todaysDate.getFullYear(), 
		todaysDate.getMonth(), 
		todaysDate.getDate()-1
	);

	//The date selected will be todays date by default
	const [selectedDate, setSelectedDate] = useState(todaysDate);

	//The coordinates we will use
	const [coordinates, setCoordinates] = useState(defaultPosition);

	//State for forcing marker update. Key updates (increments) on every click, forcing marker update
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
		//Increment key to force marker update
		setKey(prevKey => prevKey + 1);
	};

	//Map Styling
	const mapContainerStyle = {
		width: '74.5%',
		height: '500px',
		margin: '20px auto'
	};

	//Return the HTML code for the app
	return (
		
		<div className="App">
			<header>  Weather App </header>
			<h3> Please select desired date.</h3>
			<p> (Valid dates are from today to 300 days in the future.)</p>

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
						handleCoordinateSelection({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
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
