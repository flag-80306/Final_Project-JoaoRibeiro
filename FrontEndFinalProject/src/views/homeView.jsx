import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';

import { Link } from 'wouter';

function HomeView() {
	return (
		<>
			<NavBar />
			<div className='mainTitle'>
				<h1>Welcome to Inside Experiences</h1>
				<div className='buttonContainer'>
					<Link href='/tours'>
						<button className='button'>Click here to see our tours</button>{' '}
					</Link>
					<Link href='/bookings'>
						<button className='button'>Click here to see your bookings</button>{' '}
					</Link>
					<Link href='/cart'>
						<button className='button'>Click here to see your shopping cart</button>
					</Link>
				</div>
				<img src='../img/toursList.png' alt='image of all the tours' style={{ maxWidth: '100%' }} />
			</div>
			<FooterBar />
		</>
	);
}

export default HomeView;
