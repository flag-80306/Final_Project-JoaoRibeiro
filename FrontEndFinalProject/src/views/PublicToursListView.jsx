import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import toursServerCalls from '../services/toursServerCalls.js';
import HomeFooterBar from '../components/HomeFooterBar.jsx';
import HomeNavBar from '../components/HomeNavBar.jsx';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function PublicToursListView() {
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
			<HomeNavBar />
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
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<HomeFooterBar />
		</>
	);
}
export default PublicToursListView;
