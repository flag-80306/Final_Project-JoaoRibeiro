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
			<h1>Hello, my name is João</h1>
			{guides.map(guide => (
				<div key={guide.guide_id}>
					<table>
						<tr>
							<th>ID</th>
							<th>Username</th>
							<th>Guides name</th>
							<th>Picture</th>
						</tr>
						<tr>
							<td>{guide.guide_id}</td>
							<td>{guide.udername}</td>
							<td>{guide.guide_name}</td>
							<td>{guide.picture}</td>
						</tr>
					</table>
				</div>
			))}
		</>
	);
}
export default GuidesList;
