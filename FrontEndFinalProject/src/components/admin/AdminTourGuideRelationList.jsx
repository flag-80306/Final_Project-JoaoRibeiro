import { useEffect, useState } from 'react';
import toursGuidesServerCalls from '../../services/toursGuidesServerCalls.js';
import AdminTourGuideRegistration from './AdminTourGuideRegistration.jsx';
import AdminTourGuideDelete from './AdminTourGuideDelete.jsx';

function toggleTable() {
	const tableContainer = document.getElementById('table-container-tourGuides');
	if (tableContainer.classList.contains('hidden')) {
		tableContainer.classList.remove('hidden');
	} else {
		tableContainer.classList.add('hidden');
	}
}

function toggleAddTourGuides() {
	const containerAddTourGuides = document.getElementById('containerAddTourGuides');
	if (containerAddTourGuides.classList.contains('hidden')) {
		containerAddTourGuides.classList.remove('hidden');
	} else {
		containerAddTourGuides.classList.add('hidden');
	}
}

function AdminTourGuideList() {
	const [tourGuides, setTourGuides] = useState([]);

	useEffect(() => {
		async function fetchAllTourGuides() {
			const results = await toursGuidesServerCalls.getAllToursGuides();
			setTourGuides(results);
			console.log(results);
		}
		fetchAllTourGuides();
	}, []);

	return (
		<>
			<div className='mainTitle'>
				<h1>
					Tour & Guides Relation&nbsp;&nbsp;
					<button onClick={toggleTable} className='button'>
						Show/Hide Table
					</button>
				</h1>
				<div id='table-container-tourGuides' className='hidden'>
					<table className='table'>
						<thead>
							<tr>
								<th>Tour ID</th>
								<th>Tour Name</th>
								<th>Guide ID</th>
								<th>Guides Names</th>
								<th>Delete Relation</th>
							</tr>
						</thead>
						<tbody>
							{tourGuides?.map((tourGuide, index) => (
								<tr key={index}>
									<td>{tourGuide.tour_id}</td>
									<td>{tourGuide.tour_name}</td>
									<td>{tourGuide.guide_id}</td>
									<td>{tourGuide.guide_name}</td>
									<td>
										<AdminTourGuideDelete tour_id={tourGuide.tour_id} guide_id={tourGuide.guide_id} tourGuides={tourGuides} setTourGuides={setTourGuides} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<button className='button' onClick={toggleAddTourGuides}>
						Add New Relation
					</button>
					<div id='containerAddTourGuides' className='hidden'>
						<AdminTourGuideRegistration />
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminTourGuideList;
