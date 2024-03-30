import './App.css';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';


function App() {

  const todaysDate = new Date();

  return (
    <div className="App">
      <header>  Weather Prediction App </header>

    {/*Create calendar that only allows selections of todays date and forward, no past dates*/}

    <Calendar 
      minDate={new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate())}
      calendarType='US'
    />

    </div>
  );
}

export default App;
