import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import clientServerCalls from '../services/clientsServerCalls';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function HomeView() {
	const [client, setClient] = useState(null);
	const [clientData, setClientData] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			const { userID } = decodedToken;

			setClient({ client_id: userID });
		}
	}, []);

	// console.log(client);

	useEffect(() => {
		const fetchClientData = async () => {
			try {
				const data = await clientServerCalls.getClientByID(parseInt(client.client_id));

				setClientData(data);
			} catch (error) {
				console.log('Erro ao obter dados cliente:', error);
			}
		};

		fetchClientData();
	}, [client]);

	return (
		<>
			<NavBar />
			<div className='mainTitle'>
				{clientData && clientData.client_name ? <h1>Welcome {clientData.client_name}</h1> : <h1>Loading...</h1>}
				<div className='buttonContainer'>
					<Link href='/tours'>
						<button className='button'>Click here to see our tours</button>
					</Link>
					{clientData ? (
						<Link href={`/bookings/client/${client.client_id}`}>
							<button className='button'>Click here to see your bookings</button>
						</Link>
					) : null}
					{clientData ? (
						<Link href={`/client/favourite-tour/${clientData.client_id}`}>
							<button className='button'>See here your Favourite Tours</button>
						</Link>
					) : (
						<p>Loading...</p>
					)}
				</div>
				<img src='../img/toursList.png' alt='image of all the tours' style={{ maxWidth: '100%' }} className='imgHome' />
			</div>
			<FooterBar />
		</>
	);
}

export default HomeView;
