import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import guidesServerCalls from '../services/guidesServerCalls.js';
const baseDomain = 'http://localhost:3000';

function toggleTable() {
	const tableContainer = document.getElementById('table-container-guides');
	if (tableContainer.classList.contains('hidden')) {
		tableContainer.classList.remove('hidden');
	} else {
		tableContainer.classList.add('hidden');
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
								<th>Guide ID</th>
								<th>Guide Name</th>
								<th>Guide Username</th>
								<th>Description</th>
								<th>Picture</th>
								{/* <th>Password</th> */}
								<th>Edit Guide Info</th>
							</tr>
						</thead>
						<tbody>
							{guides.map(guide => (
								<tr key={guide.guide_id}>
									<td>{guide.guide_id}</td>
									<td>{guide.guide_name}</td>
									<td>{guide.guide_username}</td>
									<td>{guide.description}</td>
									<td>
										<img src={`${baseDomain}${guide.picture}`} alt={`${guide.guide_name} image`} style={{ maxWidth: '150px' }} />
									</td>

									{/* <td>{guide.password}</td> */}
									<td>
										<Link href={`/admin/home`}>
											<button className='button'>Edit</button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
export default AdmiGuidesList;
