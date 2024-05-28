import { Link } from 'wouter';
import HomeNavBar from '../components/HomeNavBar';
import HomeFooterBar from '../components/HomeFooterBar';

function HomePageView() {
	return (
		<>
			<HomeNavBar />
			<div className='mainTitle'>
				<h1>Welcome to Inside Experiences</h1>
				<div className='buttonContainer'>
					<Link href='/tours'>
						<button className='button'>Click here to see our tours</button>
					</Link>
					<Link href='/client/login'>
						<img src='../img/toursList.png' alt='image of all the tours' style={{ maxWidth: '100%' }} className='imgHome' />
					</Link>
				</div>{' '}
			</div>

			<HomeFooterBar />
		</>
	);
}

export default HomePageView;
