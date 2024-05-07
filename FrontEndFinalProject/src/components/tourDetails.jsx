import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import toursServerCalls from '../services/toursServerCalls.js';

function TourDetails() {
	const [match, params] = useRoute('/tours/:tour_id');
	const tour_id = params ? params.tour_id : null;
	const [tour, setTour] = useState(null);

	useEffect(() => {
		if (tour_id) {
			async function fetchTour() {
				const response = await toursServerCalls.getTourByID(tour_id);
				const result = response;
				console.log(result);
				setTour(result);
				console.log(tour[0]);
			}
			fetchTour();
		}
	}, [tour_id]);

	if (!tour) {
		return <h3>Loading...</h3>;
	}

	return (
		<>
			<div>
				<h1>Hello, my name is {tour[0].guide_name}</h1>

				<h1>{tour.tour_name}</h1>
				<p>Price: {tour[0].price_person}</p>
				<p>Guide: {tour[0].guide_name}</p>
				<table>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Guides name</th>
						<th>price per person</th>
						<th>created at</th>
					</tr>
					<tr>
						<td>{tour[0].tour_id}</td>
						<td>{tour[0].tour_name}</td>
						<td>{tour[0].guide_names}</td>
						<td>{tour[0].price_person}</td>
						<td>{tour[0].created_at}</td>
					</tr>
				</table>
			</div>
		</>
	);
}
export default TourDetails;
