import HomeFooterBar from '../../components/HomeFooterBar';

import ClientRegistration from '../../components/client/ClientRegistration';
function ClientRegistrationView() {
	return (
		<>
			<img src='/img/INSIDE.png' className='imgLogo' alt='logo Inside Tours' />
			<ClientRegistration />
			<HomeFooterBar />
		</>
	);
}
export default ClientRegistrationView;
