import { Route, Switch } from 'wouter';
import './App.css';
import HomePageView from './views/HomePageView';
import HomeView from './views/HomeView';
import ClientLoginView from './views/clients/ClientLoginView';
import ClientRegistrationView from './views/clients/ClientRegistrationView';
import ClientUpdatePasswordView from './views/clients/ClientUpdatePasswordView';
import ClientUpdateInfoView from './views/clients/ClientUpdateInfoView';
import ClientInfoView from './views/clients/ClientInfoView';
import ClientBookingDetailsView from './views/clients/ClientBookingDetailsView';
import ClientBookingUpdateView from './views/clients/ClientBookingUpdateView';
import ToursListView from './views/ToursListView';
import TourDetailsView from './views/TourDetailsView';
import AboutUsView from './views/AboutUsView';
import BookingsListView from './views/BookingsListView';
import NotFoundPageView from './views/NotFoundPageView';
import AdminLoginView from './views/admin/AdminLoginView';
import AdminHomeView from './views/admin/AdminHomeView';
import AdminUpdateClientInfoView from './views/admin/AdminUpdateClientInfoView';
import AdminUpdateBookingInfoView from './views/admin/AdminUpdateBookingInfoView';
import AdminUpdateGuideInfoView from './views/admin/AdminUpdateGuideInfoView';
import AdminUpdateTourInfoView from './views/admin/AdminUpdateTourInfoView';
import AdminUpdateAdminInfoView from './views/admin/AdminUpdateAdminInfoView';
import AdminUpdateTourGuideView from './views/admin/AdminUpdateTourGuideView';
import AdminUpdateFavClientTourView from './views/admin/AdminUpdateFavClientTourView';

function App() {
	return (
		<>
			<Switch>
				<Route path='/' component={HomePageView} />
				<Route path='/home' component={HomeView} />
				<Route path='/client/login' component={ClientLoginView} />
				<Route path='/client/registration' component={ClientRegistrationView} />
				<Route path='/client/:client_id' component={ClientInfoView} />
				<Route path='/client/newPassword/:client_id' component={ClientUpdatePasswordView} />
				<Route path='/client/updateInfo/:client_id' component={ClientUpdateInfoView} />

				{/* <Route path='/clients/favourite-tour/' component={ClientsFavouriteTourView} /> */}

				<Route path='/bookings/client/:client_id' component={ClientBookingDetailsView} />
				<Route path='/client/booking/:booking_id' component={ClientBookingUpdateView} />

				<Route path='/tours' component={ToursListView} />
				<Route path='/tours/:tour_id' component={TourDetailsView} />
				<Route path='/aboutus' component={AboutUsView} />
				<Route path='/bookings' component={BookingsListView} />
				<Route path='/admin/login' component={AdminLoginView} />
				<Route path='/admin/home' component={AdminHomeView} />
				<Route path='/admin/client/:client_id' component={AdminUpdateClientInfoView} />
				<Route path='/admin/booking/:booking_id' component={AdminUpdateBookingInfoView} />
				<Route path='/admin/guide/:guide_id' component={AdminUpdateGuideInfoView} />
				<Route path='/admin/tour/:tour_id' component={AdminUpdateTourInfoView} />
				<Route path='/admin/admin/:admin_id' component={AdminUpdateAdminInfoView} />
				<Route path='/admin/tour-guide/:tour_id/:guide_id' component={AdminUpdateTourGuideView} />
				<Route path='/admin/favourite-tour/:client_id/:tour_id' component={AdminUpdateFavClientTourView} />
				<Route component={NotFoundPageView} />
			</Switch>
		</>
	);
}

export default App;
