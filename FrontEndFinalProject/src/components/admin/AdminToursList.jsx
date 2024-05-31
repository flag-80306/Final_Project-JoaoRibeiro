import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import toursServerCalls from '../../services/toursServerCalls.js';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;
import AdminTourDelete from './AdminTourDelete.jsx';
import AdminTourRegistration from './AdminTourRegistration.jsx';

function toggleTable() {
	const tableContainer = document.getElementById('table-container-tours');
	if (tableContainer.classList.contains('hidden')) {
		tableContainer.classList.remove('hidden');
	} else {
		tableContainer.classList.add('hidden');
	}
}
function toggleAddTour() {
	const containerAddTour = document.getElementById('containerAddTour');
	if (containerAddTour.classList.contains('hidden')) {
		containerAddTour.classList.remove('hidden');
	} else {
		containerAddTour.classList.add('hidden');
	}
}

function AdminToursList() {
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
			<div className='mainTitle'>
				<h1>
					Tours List&nbsp;&nbsp;
					<button onClick={toggleTable} className='button'>
						Show/Hide Table
					</button>
				</h1>
				<div id='table-container-tours' className='hidden'>
					<table className='table'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Picture</th>
								<th>Description</th>

								<th>Edit</th>
							</tr>
						</thead>
						<tbody>
							{allTours &&
								allTours.map((tour, index) => (
									<tr key={index}>
										<td>
											<h3>{tour.tour_name}</h3>
											<h4>Price Per Person:</h4> {tour.price_person} €<br />
											<h4>Duration:</h4> {tour.duration} hour(s)<h4>Location:</h4>
											{tour.location}
										</td>
										<td>
											<img src={`${baseDomain}${tour.images}`} alt={`${tour.tour_name} image`} style={{ maxWidth: '100%' }} />
										</td>
										<td>{tour.description}</td>

										<td>
											<Link href={`/admin/tour/${tour.tour_id}`}>
												<button className='button'>Edit</button>
											</Link>
											<AdminTourDelete tour_id={tour.tour_id} allTours={allTours} setTours={setTours} />
										</td>
									</tr>
								))}
							<tr>
								<td colSpan='2'>
									<button className={`button ${offset === 0 ? 'disabled' : ''}`} onClick={handlePrevPage} disabled={offset === 0}>
										Previous
									</button>
								</td>
								<td colSpan='2'>
									<button className={`button ${offset + limit >= tours.totalTours ? 'disabled' : ''}`} onClick={handleNextPage} disabled={offset === limit >= tours.totalTours}>
										Next
									</button>
								</td>
							</tr>
							<tr>
								<td colSpan='4'>
									<button className='button_yellow' onClick={toggleAddTour}>
										Add New Tour
									</button>
									<div id='containerAddTour' className='hidden'>
										<AdminTourRegistration />
									</div>
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
