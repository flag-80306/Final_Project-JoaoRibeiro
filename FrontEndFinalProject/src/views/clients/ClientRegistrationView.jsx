import FooterBar from '../../components/FooterBar';
import HomePageNavBar from '../../components/HomePageNavBar';
import ClientRegistration from '../../components/client/ClientRegistration';
function ClientRegistrationView() {
	return (
		<>
			<HomePageNavBar />
			<h1>Welcome to </h1>
			<h1>Inside Experiences</h1>
			<ClientRegistration />
			<FooterBar />
		</>
	);
}
export default ClientRegistrationView;
