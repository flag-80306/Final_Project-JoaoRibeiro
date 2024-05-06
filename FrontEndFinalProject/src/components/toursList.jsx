import { useEffect, useState } from 'react';

import toursServerCalls from '../services/toursServerCalls.js';

function ToursList() {
	const [tours, setTours] = useState([]);

	useEffect(() => {
		async function fetchALLTours() {
			const results = await toursServerCalls.getAllTours();

			setTours(results);
			console.log(results);
		}
		fetchALLTours();
	}, []);

	return (
		<>
			<h1>Hello, my name is João</h1>
			{tours.map(tour => (
				<div key={tour.tour_id}>
					<table>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Guides name</th>
							<th>price per person</th>
							<th>duration</th>
							<th>description</th>
						</tr>
						<tr>
							<td>{tour.tour_id}</td>
							<td>{tour.tour_name}</td>
							<td>{tour.guide_names}</td>
							<td>{tour.price_person}</td>
							<td>{tour.duration}</td>
							<td>{tour.description}</td>
						</tr>
					</table>
				</div>
			))}
		</>
	);
}
export default ToursList;
