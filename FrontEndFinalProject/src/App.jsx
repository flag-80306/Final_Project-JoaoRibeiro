import { Route, Switch } from 'wouter';
import './App.css';
import HomePageView from './views/HomePageView';
import HomeView from './views/HomeView';
import ClientLoginView from './views/ClientLoginView';
import ClientInfoView from './views/ClientInfoView';
import ToursListView from './views/ToursListView';
import TourDetailsView from './views/TourDetailsView';
import ClientBookingDetailsView from './views/ClientBookingDetailsView';
import AboutUsView from './views/AboutUsView';
import BookingsListView from './views/BookingsListView';
import NotFoundPageView from './views/NotFoundPageView';

function App() {
	return (
		<>
			<Switch>
				<Route path='/' component={HomePageView} />

				<Route path='/clients/login' component={ClientLoginView} />

				<Route path='/clients/:client_id' component={ClientInfoView} />

				{/* <Route path='/clients/register/' component={ClientsRegister} /> */}

				{/* <Route path='/clients/shooping_cart/' component={ClientsShoppingCart} /> */}

				<Route path='/home' component={HomeView} />

				<Route path='/tours' component={ToursListView} />

				<Route path='/tours/:tour_id' component={TourDetailsView} />

				<Route path='/aboutus' component={AboutUsView} />

				<Route path='/bookings' component={BookingsListView} />

				{/* <Route path='/admin/login' component={AdminLoginView} /> */}
				{/* <Route path='/admin/clients' component={AllClientsListView} /> */}

				<Route path='/bookings/client/:client_id' component={ClientBookingDetailsView} />

				<Route component={NotFoundPageView} />
			</Switch>
		</>
	);
}

export default App;
