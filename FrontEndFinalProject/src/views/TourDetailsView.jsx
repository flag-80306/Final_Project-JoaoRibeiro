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
			<div className='mainTitle'>
				<h1>Tour Detail - {tour[0].tour_name}</h1>

				<div className='tourContainer'>
					<div>
						<img src={`${baseDomain}${tour[0].images}`} alt={`${tour[0].tour_name} image`} className='imgTour' />
					</div>
					<div>
						<table>
							<tr>
								<td className='boldColumn'>Name:</td>
								<td> {tour[0].tour_name}</td>
							</tr>
							<tr>
								<td className='boldColumn'>Guides name:</td>
								<td>
									<select>
										{tour[0].guide_names.split(',').map((guideName, index) => (
											<option key={index} value={guideName.trim()}>
												{guideName.trim()}
											</option>
										))}
									</select>
								</td>
							</tr>
							<tr>
								<td className='boldColumn'>Price per person:</td> <td>{tour[0].price_person} €</td>
							</tr>
							<tr>
								<td className='boldColumn'>Duration:</td>
								<td>{tour[0].duration} hour(s)</td>
							</tr>
							<tr>
								<td className='boldColumn'>Description:</td>
								<td> {tour[0].description}</td>
							</tr>
						</table>
					</div>
				</div>
				<div className='tourContainer'>
					<Link href={'/home'}>
						<button className='button'>Return main page</button>
					</Link>
					<Link href={`/tours/`}>
						<button className='button'>Return to Tours List</button>
					</Link>
					<Link href={`/tours/${tour.tour_id}`}>
						<button className='button'>Send to Shopping Cart!</button>
					</Link>
				</div>
			</div>
			<FooterBar />
		</>
	);
}
export default TourDetailView;
