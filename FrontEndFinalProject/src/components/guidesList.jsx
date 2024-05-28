import { useEffect, useState } from 'react';
import guidesServerCalls from '../services/guidesServerCalls.js';
import { Link } from 'wouter';
import FooterBar from './client/ClientFooterBar.jsx';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;
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
			<div className='mainTitle'>
				<h1>Guides List</h1>
				<div>
					<table className='table'>
						<thead>
							<tr>
								<th>Guides name</th>
								<th>Description</th>
								<th>Picture</th>
							</tr>
						</thead>
						<tbody>
							{guides.map(guide => (
								<tr key={guide.guide_id}>
									<td>{guide.guide_name}</td>
									<td>{guide.description}</td>
									<td>
										<img src={`${baseDomain}${guide.picture}`} alt={`${guide.guide_name} image`} style={{ maxWidth: '150px' }} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Link href={'/home'}>
						<button className='button'>Return main page</button>
					</Link>
				</div>
			</div>
			<FooterBar />
		</>
	);
}
export default GuidesList;
