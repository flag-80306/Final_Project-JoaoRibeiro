import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import AdminToursList from '../components/AdminToursList.jsx';

const baseDomain = 'http://localhost:3000';
function ToursListView() {
	return (
		<>
			<NavBar />
			<AdminToursList />
			<FooterBar />
		</>
	);
}
export default ToursListView;
