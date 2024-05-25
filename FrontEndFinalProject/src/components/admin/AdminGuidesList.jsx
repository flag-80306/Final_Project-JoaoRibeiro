import { useEffect, useState } from 'react';
import { Link } from 'wouter';

const baseDomain = 'http://localhost:3000';
import AdminGuideRegistration from './AdminGuideRegistration.jsx';
import AdminGuideDelete from './AdminGuideDelete.jsx';
import guidesServerCalls from '../../services/guidesServerCalls.js';

function toggleTable() {
	const tableContainer = document.getElementById('table-container-guides');
	if (tableContainer.classList.contains('hidden')) {
		tableContainer.classList.remove('hidden');
	} else {
		tableContainer.classList.add('hidden');
	}
}
function toggleAddGuide() {
	const containerAddGuide = document.getElementById('containerAddGuide');
	if (containerAddGuide.classList.contains('hidden')) {
		containerAddGuide.classList.remove('hidden');
	} else {
		containerAddGuide.classList.add('hidden');
	}
}

function AdmiGuidesList() {
	const [guides, setGuides] = useState([]);

	useEffect(() => {
		async function fetchAllGuides() {
			const results = await guidesServerCalls.getAllGuides();
			setGuides(results);
		}
		fetchAllGuides();
	}, []);

	return (
		<>
			<div className='mainTitle'>
				<h1>
					Guides List&nbsp;&nbsp;
					<button onClick={toggleTable} className='button'>
						Show/Hide Table
					</button>
				</h1>
				<div id='table-container-guides' className='hidden'>
					<table className='table'>
						<thead>
							<tr>
								<th>
									Guide <br />
									(Id & Name)
								</th>
								<th>Description</th>
								<th>Picture</th>
								<th>Edit / Delete</th>
							</tr>
						</thead>
						<tbody>
							{guides.map(guide => (
								<tr key={guide.guide_id}>
									<td>
										{guide.guide_id}, <br />
										{guide.guide_name}
									</td>
									<td>{guide.description}</td>
									<td>
										<img src={`${baseDomain}${guide.picture}`} alt={`${guide.guide_name} image`} style={{ maxWidth: '150px' }} />
									</td>
									<td>
										<Link href={`/admin/guide/${guide.guide_id}`}>
											<button className='button'>Edit</button>
										</Link>
										<AdminGuideDelete guide_id={guide.guide_id} guides={guides} setGuides={setGuides} />
									</td>
								</tr>
							))}

							<tr>
								<td colSpan='4'>
									<button className='button' onClick={toggleAddGuide}>
										Add New Guide
									</button>
									<div id='containerAddGuide' className='hidden'>
										<AdminGuideRegistration setGuides={setGuides} />
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
export default AdmiGuidesList;
