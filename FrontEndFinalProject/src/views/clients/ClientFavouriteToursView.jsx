import { useEffect, useState } from 'react';
import favToursServerCalls from '../../services/favToursServerCalls.js';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'wouter';
import ClientFavTourDelete from '../../components/client/ClientFavTourDelete.jsx';
import NavBar from '../../components/NavBar.jsx';
import FooterBar from '../../components/FooterBar.jsx';

function ClientFavouriteToursView() {
	const [client, setClient] = useState(null);
	const [favTours, setFavTours] = useState([]);
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			const { userID } = decodedToken;

			setClient({ client_id: userID });
		}
	}, []);

	console.log('client', client);

	useEffect(() => {
		const fetchClientData = async () => {
			try {
				const data = await favToursServerCalls.getFavToursByClientID(parseInt(client.client_id));
				console.log('data', data);
				setFavTours(data);
			} catch (error) {
				console.log('Erro ao obter dados cliente:', error);
			}
		};

		fetchClientData();
	}, [client]);
	console.log('favTours', favTours);
	return (
		<>
			<NavBar />
			<div className='mainTitle'>
				<h1> Favourite Tours & Guides Relation</h1>
				<div>
					<table className='table'>
						<thead>
							<tr>
								<th>Tour Name</th>
								<th>Remove From Favourites</th>
								<th>Book now!</th>
							</tr>
						</thead>
						<tbody>
							{favTours?.map((favTour, index) => (
								<tr key={index}>
									<td>
										{favTour.tour_id},<br />
										{favTour.tour_name}
									</td>

									<td>
										<ClientFavTourDelete tour_id={favTour.tour_id} client_id={favTour.client_id} favTours={favTours} setFavTours={setFavTours} />
									</td>

									<td>
										{/* <Link href={`/admin/tour-guide/${favTour.tour_id}/${favTour.guide_id}`}> */}
										{/* <button className='button'>Book Now!</button> */}
										{/* </Link> */}

										<Link href={`/tours/${favTour.tour_id}`}>
											<button className='button'>Book Now!</button>
										</Link>
									</td>
								</tr>
							))}

							{/* <tr>
								<td colSpan='3'>
									<button className='button' onClick={toggleAddTourGuides}>
										Add New Relation
									</button>
									<div id='containerAddTourGuides' className='hidden'>
										<AdminTourGuideRegistration />
									</div>
								</td>
							</tr> */}
						</tbody>
					</table>
				</div>
			</div>
			<FooterBar />
		</>
	);
}

export default ClientFavouriteToursView;
