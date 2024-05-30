import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import toursServerCalls from '../services/toursServerCalls.js';
import HomeFooterBar from '../components/HomeFooterBar.jsx';
import HomeNavBar from '../components/HomeNavBar.jsx';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function PublicToursListView() {
	const [tours, setTours] = useState([]);
	const [limit, setLimit] = useState(3);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		async function fetchALLTours() {
			const results = await toursServerCalls.getAllTours(limit, offset);
			setTours(results);
		}
		fetchALLTours();
	}, [limit, offset]);
	const allTours = tours.result;

	const handleNextPage = () => {
		if (offset + limit < tours.totalTours) {
			setOffset(offset + limit);
		}
	};

	const handlePrevPage = () => {
		setOffset(Math.max(0, offset - limit));
	};

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
							{allTours &&
								allTours.map(tour => (
									<tr key={tour.tour_id}>
										<td>
											<h3 className='m10'>{tour.tour_name}</h3>
											<img src={`${baseDomain}${tour.images}`} alt={`${tour.tour_name} image`} style={{ maxWidth: '100%' }} />
										</td>

										<td>
											<h4>Price per person:</h4> {tour.price_person} €<h4>Duration:</h4> {tour.duration} hour(s)
											<br />
											<h4>Description:</h4>
											{tour.description}
										</td>
									</tr>
								))}
							<tr>
								<td className='buttonContainer'>
									<button className={`button ${offset === 0 ? 'disabled' : ''}`} onClick={handlePrevPage} disabled={offset === 0}>
										Previous
									</button>
								</td>
								<td>
									<button className={`button ${offset + limit >= tours.totalTours ? 'disabled' : ''}`} onClick={handleNextPage} disabled={offset === limit >= tours.totalTours}>
										Next
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<HomeFooterBar />
		</>
	);
}
export default PublicToursListView;
