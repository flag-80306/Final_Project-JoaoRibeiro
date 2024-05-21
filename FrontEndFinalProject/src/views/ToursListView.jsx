import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import ClientToursList from '../components/client/ClientToursList.jsx';

const baseDomain = 'http://localhost:3000';
function ToursListView() {
	return (
		<>
			<NavBar />
			<ClientToursList />
			<FooterBar />
		</>
	);
}
export default ToursListView;
