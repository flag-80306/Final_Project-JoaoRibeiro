import { Route, Switch, Link } from 'wouter';
import './App.css';
import HomeView from './views/HomeView';
import ClientLoginView from './views/ClientLoginView';
import ToursListView from './views/ToursListView';
import TourDetailsView from './views/TourDetailsView';
import AboutUsView from './views/AboutUsView';
import BookingsList from './components/BookingsList';
import NotFoundPageView from './views/NotFoundPageView';

function App() {
	return (
		<>
			<Switch>
				<Route path='/' component={ClientLoginView} />

				<Route path='/home' component={HomeView} />

				<Route path='/tours' component={ToursListView} />

				<Route path='/tours/:tour_id' component={TourDetailsView} />

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
