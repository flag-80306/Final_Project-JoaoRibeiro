import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import toursServerCalls from '../../services/toursServerCalls.js';
const baseDomain = 'http://localhost:3000';

function toggleTable() {
	const tableContainer = document.getElementById('table-container-tours');
	if (tableContainer.classList.contains('hidden')) {
		tableContainer.classList.remove('hidden');
	} else {
		tableContainer.classList.add('hidden');
	}
}

function AdminToursList() {
	const [tours, setTours] = useState([]);

	useEffect(() => {
		async function fetchALLTours() {
			const results = await toursServerCalls.getAllTours();
			setTours(results);
		}
		fetchALLTours();
	}, []);

	return (
		<>
			<div className='mainTitle'>
				<h1>
					Tours List&nbsp;&nbsp;
					<button onClick={toggleTable} className='button'>
						Show/Hide Table
					</button>
				</h1>
				<div id='table-container-tours' className='hidden'>
					<table className='table'>
						<thead>
							<tr>
								{/* <th>Tour ID</th> */}
								<th>Name</th>
								<th>Location</th>
								<th>Description</th>
								<th>Price Per Person</th>
								<th>Duration</th>
								{/* <th>Reviews</th> */}
								<th>Picture</th>
								<th>Edit</th>
							</tr>
						</thead>
						<tbody>
							{tours.map(tour => (
								<tr key={tour.tour_id}>
									{/* <td>{tour.tour_id}</td> */}
									<td>{tour.tour_name}</td>
									<td>
										{tour.location},<br />
										lat: {tour.latitude},<br />
										lon: {tour.longitude}
									</td>
									<td>{tour.description}</td>
									<td>{tour.price_person} €</td>
									<td>{tour.duration} hour(s)</td>
									{/* <td>{tour.review}</td> */}
									<td>
										<img src={`${baseDomain}${tour.images}`} alt={`${tour.tour_name} image`} style={{ maxWidth: '70%' }} />
									</td>
									<td>
										<Link href={`/admin/tour/${tour.tour_id}`}>
											<button className='button'>Edit</button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
export default AdminToursList;
