import { useEffect, useState } from 'react';
import { Link, useRoute } from 'wouter';
import toursServerCalls from '../services/toursServerCalls.js';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
const baseDomain = 'http://localhost:3000';
function TourDetailView() {
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
			<NavBar />
			<div>
				<h1>Tour Detail</h1>
				<div>
					<h1>{tour.tour_name}</h1>
					<table className='table'>
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
						<tr>
							<td>{tour[0].tour_id}</td>
							<td>{tour[0].tour_name}</td>
							<td>
								<select>
									{tour[0].guide_names.split(',').map((guideName, index) => (
										<option key={index} value={guideName.trim()}>
											{guideName.trim()}
										</option>
									))}
								</select>
							</td>
							<td>{tour[0].price_person} €</td>
							<td>{tour[0].duration}</td>
							<td>{tour[0].description}</td>
							<td>
								<img src={`${baseDomain}${tour[0].images}`} alt={`${tour[0].tour_name} image`} style={{ maxWidth: '100%' }} />
							</td>
							<td>
								<Link href={`/tours/${tour.tour_id}`}>
									<button className='button'>Book now!</button>
								</Link>
							</td>
						</tr>
					</table>
					<Link href={'/home'}>
						<button className='button'>Return main page</button>
					</Link>
				</div>
			</div>
			<FooterBar />
		</>
	);
}
export default TourDetailView;
