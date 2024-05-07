import ToursList from '../components/toursList';
import GuidesList from '../components/guidesList';
import BookingsList from '../components/bookingsList';

function HomeView() {
	return (
		<>
			<div>
				<ToursList />
				<GuidesList />
				<BookingsList />
			</div>
		</>
	);
}

export default HomeView;
