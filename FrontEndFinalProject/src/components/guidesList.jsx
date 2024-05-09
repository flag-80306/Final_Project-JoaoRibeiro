import { useEffect, useState } from 'react';

import guidesServerCalls from '../services/guidesServerCalls.js';
import { Link } from 'wouter';
const baseDomain = 'http://localhost:3000';
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
						<th>Guides name</th>
						<th>Picture</th>
					</tr>
					{guides.map(guide => (
						<tr key={guide.guide_id}>
							<td>{guide.guide_name}</td>
							<td>
								<img src={`${baseDomain}${guide.picture}`} alt={`${guide.guide_name} image`} style={{ maxWidth: '150px' }} />
							</td>
						</tr>
					))}
				</table>
				<Link href={'/home'}>
					<button>Return main page</button>
				</Link>
			</div>
		</>
	);
}
export default GuidesList;
