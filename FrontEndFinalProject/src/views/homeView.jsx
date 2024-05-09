import { Link } from 'wouter';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';

function HomeView() {
	return (
		<>
			<div>
				<NavBar />
				<h1>Welcome to Inside tours</h1>
				<div>
					<br />
					<br />
					<Link href={'/tours'}>
						<button>See here our tours</button>
					</Link>
					<br />
					<br />
					<Link href={'/aboutus'}>
						<button> Click here to see our guides</button>
					</Link>
					<br />
					<br />
					<Link href={'/bookings'}>
						<button>Click here to see your bookings</button>
					</Link>
				</div>
				<FooterBar />
			</div>
		</>
	);
}

export default HomeView;
