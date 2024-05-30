import { useEffect, useState } from 'react';
import { Link } from 'wouter';

import AdminFavClientToursDelete from './AdminFavClientToursDelete.jsx';
import AdminFavClientToursRegistration from './AdminFavClientToursRegistration.jsx';
import favToursServerCalls from '../../services/favToursServerCalls.js';

function toggleTable() {
	const tableContainer = document.getElementById('table-container-favTours');
	if (tableContainer.classList.contains('hidden')) {
		tableContainer.classList.remove('hidden');
	} else {
		tableContainer.classList.add('hidden');
	}
}

function toggleAddTourGuides() {
	const containerAddFavClientTour = document.getElementById('containerAddFavClientTour');
	if (containerAddFavClientTour.classList.contains('hidden')) {
		containerAddFavClientTour.classList.remove('hidden');
	} else {
		containerAddFavClientTour.classList.add('hidden');
	}
}

function AdminFavouriteClientToursList() {
	const [favTours, setFavTours] = useState([]);

	useEffect(() => {
		async function fetchAllFavClientTours() {
			const results = await favToursServerCalls.getAllFavClientTours();
			setFavTours(results);
		}
		fetchAllFavClientTours();
	}, []);

	return (
		<>
			<div className='mainTitle'>
				<h1>
					Clients Favourite Tours&nbsp;&nbsp;
					<button onClick={toggleTable} className='button'>
						Show/Hide Table
					</button>
				</h1>
				<div id='table-container-favTours' className='hidden'>
					<table className='table'>
						<thead>
							<tr>
								<th>Client Name</th>

								<th>Tour Name</th>
								<th>Delete Relation</th>
							</tr>
						</thead>
						<tbody>
							{favTours?.map((favTour, index) => (
								<tr key={index}>
									<td>
										{favTour.client_id},<br />
										{favTour.client_name}
									</td>
									<td>
										{favTour.tour_id},<br />
										{favTour.tour_name}
									</td>
									<td>
										<Link href={`/admin/favourite-tour/${favTour.client_id}/${favTour.tour_id}`}>
											<button className='button'>Edit</button>
										</Link>
										<AdminFavClientToursDelete client_id={favTour.client_id} tour_id={favTour.tour_id} favTours={favTours} setFavTours={setFavTours} />
									</td>
								</tr>
							))}

							<tr>
								<td colSpan='3'>
									<button className='button_yellow' onClick={toggleAddTourGuides}>
										Add To Favourites
									</button>
									<div id='containerAddFavClientTour' className='hidden'>
										<AdminFavClientToursRegistration setFavTours={setFavTours} />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
export default AdminFavouriteClientToursList;
