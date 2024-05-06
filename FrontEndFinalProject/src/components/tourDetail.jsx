import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toursServerCalls from '../services/toursServerCalls.js';

function TourDetail() {
	const { tour_id } = useParams();
	const [tour, setTour] = useState(null);

	useEffect(() => {
		async function fetchTour() {
			const results = await toursServerCalls.getTourByID();
			console.log(results);

			setTour(results);
		}
		fetchTour();
	}, [tour_id]);
	if (!tour) {
		return <h3>Loading...</h3>;
	}

	return (
		<>
			<div>
				<h1>Hello, my name is {tour.guide_name} João</h1>
				<h1>{tour.tour_name}</h1>
				<p>Price: {tour.price_person}</p>
				<p>Guide: {tour.guide_name}</p>
				<table>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Guides name</th>
						<th>price per person</th>
						<th>created at</th>
					</tr>
					<tr>
						<td>{tour.tour_id}</td>
						<td>{tour.tour_name}</td>
						<td>{tour.guide_names}</td>
						<td>{tour.price_person}</td>
						<td>{tour.created_at}</td>
					</tr>
				</table>
			</div>
			{/* {tour.map(tour => (
				<div key={tour.tour_id}>
					<h1>Hello, my name is {tour.guide_name} João</h1>
					<table>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Guides name</th>
							<th>price per person</th>
							<th>created at</th>
						</tr>
						<tr>
							<td>{tour.tour_id}</td>
							<td>{tour.tour_name}</td>
							<td>{tour.guide_names}</td>
							<td>{tour.price_person}</td>
							<td>{tour.created_at}</td>
						</tr>
					</table>
				</div>
			))} */}
		</>
	);
}
export default TourDetail;
