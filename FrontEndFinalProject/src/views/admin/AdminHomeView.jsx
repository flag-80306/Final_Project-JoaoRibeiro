import adminsServerCalls from '../../services/adminsServerCalls';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import AdminBookingsList from '../../components/admin/AdminBookingsList';
import AdminClientsList from '../../components/admin/AdminClientsList';
import AdminsList from '../../components/admin/AdminsList';
import AdminGuidesList from '../../components/admin/AdminGuidesList';
import AdminToursList from '../../components/admin/AdminToursList';
import AdminTourGuideRelationList from '../../components/admin/AdminTourGuideRelationList';
import AdminFavouriteClientToursList from '../../components/admin/AdminFavouriteClientToursList';
import AdminNavBar from '../../components/AdminNavBar';
import AdminFooterBar from '../../components/AdminFooterBar';

function HomeView() {
	const [admin, setAdmin] = useState(null);
	const [adminData, setAdminData] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			// console.log('ded', decodedToken);
			const { userID } = decodedToken;

			setAdmin({ manager_id: userID });
		}
	}, []);

	// console.log('ad', admin);

	useEffect(() => {
		const fetchAdminData = async () => {
			try {
				const data = await adminsServerCalls.getManagerByID(parseInt(admin.manager_id));
				// console.log('data', data);
				setAdminData(data);
			} catch (error) {
				console.log('Erro ao obter dados cliente:', error);
			}
		};

		fetchAdminData();
	}, [admin]);

	// console.log(adminData);

	return (
		<>
			{adminData && <AdminNavBar manager_name={adminData.manager_name} email={adminData.email} />}
			<div className='mainTitle'>
				<div className='mainTitle'>
					<AdminClientsList />
					<AdminBookingsList />
					<AdminGuidesList />
					<AdminToursList />
					<AdminTourGuideRelationList />
					<AdminFavouriteClientToursList />
					<AdminsList />
				</div>
			</div>
			<AdminFooterBar />
		</>
	);
}

export default HomeView;
