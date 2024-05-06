import { Route, Switch } from 'wouter';
import './App.css';
import ToursList from './components/toursList';
import GuidesList from './components/guidesList';
import BookingsList from './components/bookingsList';

function App() {
	return (
		<>
			<ToursList />
			<GuidesList />
			<BookingsList />
		</>
	);
}

export default App;
