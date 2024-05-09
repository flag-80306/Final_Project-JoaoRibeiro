import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import toursServerCalls from '../services/toursServerCalls.js';

const baseDomain = 'http://localhost:3000';
function ToursList() {
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
			<h1>Tours List</h1>

			<div>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Guides name</th>
							<th>price per person</th>
							<th>duration</th>
							<th>description</th>
							<th>picture</th>
							<th>book tour</th>
						</tr>
					</thead>
					<tbody>
						{tours.map(tour => (
							<tr key={tour.tour_id}>
								<td>{tour.tour_id}</td>
								<td>{tour.tour_name}</td>
								<td>
									<select>
										{tour.guide_names.split(',').map((guideName, index) => (
											<option key={index} value={guideName.trim()}>
												{guideName.trim()}
											</option>
										))}
									</select>
								</td>
								<td>{tour.price_person}</td>
								<td>{tour.duration}</td>
								<td>{tour.description}</td>
								<td>
									<img src={`${baseDomain}${tour.images}`} alt={`${tour.tour_name} image`} style={{ maxWidth: '100%' }} />
								</td>
								<td>
									<Link href={`/tours/${tour.tour_id}`}>
										<button>Book now!</button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Link href={'/home'}>
					<button>Return main page</button>
				</Link>
			</div>
		</>
	);
}
export default ToursList;
