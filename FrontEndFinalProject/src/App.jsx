import { Route, Switch, Link } from 'wouter';
import './App.css';
import HomeView from './views/homeView';
import ToursList from './components/toursList';
import TourDetails from './components/tourDetails';
import GuidesList from './components/guidesList';
import BookingsList from './components/bookingsList';
import NotFoundPageView from './views/notFoundPageView';

function App() {
	return (
		<>
			<Switch>
				<Route path='/'>
					<h1>Welcome to Inside Tours</h1>
					<p>Please identify yourself</p>
					<Link href={'/home'}>
						<button>Log In</button>
					</Link>
				</Route>
				<Route path='/home' components='HomeView'>
					<HomeView />
				</Route>

				<Route path='/tours' component={ToursList} />

				<Route path='/tours/:tour_id' component={TourDetails} />

				<Route path='/guides' component={GuidesList} />

				{/* <Route path='/guides/:guides_id' component={GuideDetails} /> */}

				<Route path='/bookings' component={BookingsList} />

				{/* <Route path='/bookings/:booking_id' component={BookingDetails} /> */}

				<Route component={NotFoundPageView} />
			</Switch>
		</>
	);
}

export default App;
