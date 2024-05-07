import { useEffect, useState } from 'react';

import guidesServerCalls from '../services/guidesServerCalls.js';

function GuidesList() {
	const [guides, setGuides] = useState([]);

	useEffect(() => {
		async function fetchALLGuides() {
			const results = await guidesServerCalls.getAllGuides();
			console.log(results);
			setGuides(results);
		}
		fetchALLGuides();
	}, []);

	return (
		<>
			<h1>Guides List</h1>

			<div>
				<table>
					<tr>
						<th>ID</th>
						<th>Username</th>
						<th>Guides name</th>
						<th>Picture</th>
					</tr>
					{guides.map(guide => (
						<tr key={guide.guide_id}>
							<td>{guide.guide_id}</td>
							<td>{guide.udername}</td>
							<td>{guide.guide_name}</td>
							<td>{guide.picture}</td>
						</tr>
					))}
				</table>
			</div>
		</>
	);
}
export default GuidesList;
