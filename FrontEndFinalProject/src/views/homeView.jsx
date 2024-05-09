import ToursList from '../components/toursList';
import GuidesList from '../components/guidesList';
import BookingsList from '../components/bookingsList';
import { Link } from 'wouter';

function HomeView() {
	return (
		<>
			<div>
				<h1>Welcome to Inside tours</h1>
				<div>
					<br />
					<br />
					<Link href={'/tours'}>
						<button>See here our tours</button>
					</Link>
					<br />
					<br />
					<Link href={'/guides'}>
						<button> Click here to see our guides</button>
					</Link>
					<br />
					<br />
					<Link href={'/bookings'}>
						<button>Click here to see your bookings</button>
					</Link>
				</div>
			</div>
		</>
	);
}

export default HomeView;
