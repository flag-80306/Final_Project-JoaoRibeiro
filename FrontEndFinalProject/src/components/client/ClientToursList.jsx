import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import toursServerCalls from '../../services/toursServerCalls.js';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

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
				<h1>Tours List</h1>
				<div>
					<table className='table'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Details</th>
							</tr>
						</thead>
						<tbody>
							{tours.map(tour => (
								<tr key={tour.tour_id}>
									<td>
										<h3>{tour.tour_name}</h3>
										<br />
										<img src={`${baseDomain}${tour.images}`} alt={`${tour.tour_name} image`} style={{ maxWidth: '70%' }} />
									</td>

									<td>
										<h4>Price per person:</h4> {tour.price_person} €<h4>Duration:</h4> {tour.duration} hour(s)
										<br />
										<Link href={`/tours/${tour.tour_id}`}>
											<button className='button'>Click here for + info</button>
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
