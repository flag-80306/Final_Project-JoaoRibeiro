import { Route, Switch, Link } from 'wouter';
import './App.css';
import HomeView from './views/HomeView';
import ClientLoginView from './views/ClientLoginView';
import ToursList from './components/ToursList';
import TourDetails from './components/TourDetails';
import AboutUsView from './views/AboutUsView';
import BookingsList from './components/BookingsList';
import NotFoundPageView from './views/NotFoundPageView';

function App() {
	return (
		<>
			<Switch>
				<Route path='/' component={ClientLoginView} />

				<Route path='/home' component={HomeView} />

				<Route path='/tours' component={ToursList} />

				<Route path='/tours/:tour_id' component={TourDetails} />

				<Route path='/aboutus' component={AboutUsView} />

				{/* <Route path='/guides/:guides_id' component={GuideDetails} /> */}

				<Route path='/bookings' component={BookingsList} />

				{/* <Route path='/bookings/:booking_id' component={BookingDetails} /> */}

				<Route component={NotFoundPageView} />
			</Switch>
		</>
	);
}

export default App;
