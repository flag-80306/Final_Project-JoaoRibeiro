import HomePageNavBar from '../components/HomePageNavBar';
import FooterBar from '../components/FooterBar';

import { Link } from 'wouter';

function HomePageView() {
	return (
		<>
			<Link href='/clients/login'>
				<HomePageNavBar />
				<div className='mainTitle'>
					<h1>Welcome</h1>
					<div className='buttonContainer'>
						<button className='button'>Click here to see our tours</button> <button className='button'>Click here to see your bookings</button>{' '}
						<button className='button'>Click here to see your shopping cart</button>
					</div>
					<img src='../img/toursList.png' alt='image of all the tours' style={{ maxWidth: '100%' }} className='imgHome' />
				</div>
				<FooterBar />
			</Link>
		</>
	);
}

export default HomePageView;
