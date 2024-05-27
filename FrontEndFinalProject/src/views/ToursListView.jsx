import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import ClientToursList from '../components/client/ClientToursList.jsx';
import { Link } from 'wouter';

// const baseDomain = import.meta.env.BASE_DOMAIN;
function ToursListView() {
	return (
		<>
			<NavBar />
			<ClientToursList />
			<Link href={'/home'}>
				<button className='button'>Return main page</button>
			</Link>
			<FooterBar />
		</>
	);
}
export default ToursListView;
