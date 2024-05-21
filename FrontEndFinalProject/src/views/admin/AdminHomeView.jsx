import clientServerCalls from '../../services/clientsServerCalls';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import AdminBookingsList from '../../components/admin/AdminBookingsList';
import AdminClientsList from '../../components/admin/AdminClientsList';
import AdminsList from '../../components/admin/AdminsList';
import AdminGuidesList from '../../components/admin/AdminGuidesList';
import AdminToursList from '../../components/admin/AdminToursList';
import AdminShoppingCartsList from '../../components/admin/AdminShoppingCartsList';

function HomeView() {
	// const [client, setClient] = useState(null);
	// const [clientData, setClientData] = useState(null);

	// useEffect(() => {
	// 	const token = localStorage.getItem('token');
	// 	if (token) {
	// 		const decodedToken = jwtDecode(token);
	// 		const { userID } = decodedToken;

	// 		setClient({ client_id: userID });
	// 	}
	// }, []);

	// // console.log(client);

	// useEffect(() => {
	// 	const fetchClientData = async () => {
	// 		try {
	// 			const data = await clientServerCalls.getClientByID(parseInt(client.client_id));

	// 			setClientData(data);
	// 		} catch (error) {
	// 			console.log('Erro ao obter dados cliente:', error);
	// 		}
	// 	};

	// 	fetchClientData();
	// }, [client]);

	// console.log(clientData);

	return (
		<>
			<div className='mainTitle'>
				<AdminClientsList />
				<AdminBookingsList />
				<AdminGuidesList />
				<AdminToursList />
				<AdminShoppingCartsList />
				<AdminsList />
			</div>
		</>
	);
}

export default HomeView;
