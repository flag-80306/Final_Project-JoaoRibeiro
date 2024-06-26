import ClientNavBar from '../components/client/ClientNavBar';
import ClientFooterBar from '../components/client/ClientFooterBar';
import ClientToursList from '../components/client/ClientToursList.jsx';
import { Link } from 'wouter';

function ToursListView() {
	return (
		<>
			<ClientNavBar />
			<ClientToursList />
			<Link href={'/home'}>
				<button className='button'>Return main page</button>
			</Link>
			<ClientFooterBar />
		</>
	);
}
export default ToursListView;
