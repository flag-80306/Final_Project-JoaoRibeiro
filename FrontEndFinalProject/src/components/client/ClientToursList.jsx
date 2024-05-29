import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import toursServerCalls from '../../services/toursServerCalls.js';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminToursList() {
	const [tours, setTours] = useState([]);
	const [limit, setLimit] = useState(3);
	const [offset, setOffset] = useState(0);
	// const [totalTours, setTotalTours] = useState(0);

	useEffect(() => {
		async function fetchALLTours() {
			const tours = await toursServerCalls.getAllTours(limit, offset);
			setTours(tours);
		}
		fetchALLTours();
	}, [limit, offset]);
	console.log('tour.r', tours.result);
	console.log('t', tours.totalTours);
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
		</>
	);
}
export default AdminToursList;
