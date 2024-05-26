import { useEffect, useState } from 'react';
import { Link, useRoute } from 'wouter';
import toursServerCalls from '../services/toursServerCalls.js';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import { jwtDecode } from 'jwt-decode';

// import ClientBookingRegistrationView from './clients/ClientBookingRegistrationView.jsx';
const baseDomain = 'http://localhost:3000';

function TourDetailView() {
	const [match, params] = useRoute('/tours/:tour_id');
	const tour_id = params ? params.tour_id : null;
	const [tour, setTour] = useState(null);
	const [people, setPeople] = useState(1);
	const [bookingDate, setBookingDate] = useState('');
	const [guideID, setGuideID] = useState('');
	const [clientID, setClientID] = useState(null);

	useEffect(() => {
		if (tour_id) {
			async function fetchTour() {
				const response = await toursServerCalls.getTourByID(tour_id);
				const result = response[0];
				// console.log('result', result);
				setTour(result);
				// Set default guideID if available - verificar
				if (result.guide_id) {
					setGuideID(result.guide_id.split(',')[0].trim());
				}
			}
			fetchTour();
		}

		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			const { userID } = decodedToken;
			setClientID(userID);
		}
	}, [tour_id]);

	// console.log('tour', tour);
	if (!tour) {
		return <h3>Loading...</h3>;
	}

	async function handlePostSubmit(event) {
		event.preventDefault();

		const guideIdMap = {};
		tour.guide_names.split(',').forEach((guideName, index) => {
			const guideId = tour.guide_id.split(',')[index].trim();
			guideIdMap[guideName.trim()] = guideId;
		});

		const finalPrice = tour.price_person * people;

		const body = {
			tour_id,
			guide_id: guideID,
			people,
			final_price: finalPrice,
			booking_date: bookingDate,
			client_id: clientID,
		};
		// console.log('Submitting booking with body:', body);

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/bookings/register`;
			const response = await fetch(url, options);
			const result = await response.json();
			if (response.ok) {
				console.log('Registration successful', result);
				alert('New booking created!');
			} else {
				console.error('Registration failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<NavBar />
			<div className='mainTitle'>
				<h1>Tour Detail - {tour.tour_name}</h1>

				<div className='tourContainer'>
					<form onSubmit={handlePostSubmit}>
						<table>
							<tbody>
								<tr>
									<td className='boldColumn'>Description:</td>
									<td> {tour.description}</td>
								</tr>
								<tr>
									<td className='boldColumn'>Duration:</td>
									<td>{tour.duration} hour(s)</td>
								</tr>
								<tr>
									<td className='boldColumn'>Guides name:</td>
									<td>
										<select value={guideID} onChange={e => setGuideID(e.target.value)}>
											{tour.guide_names.split(',').map((guideName, index) => (
												<option key={index} value={tour.guide_id.split(',')[index].trim()}>
													{guideName.trim()}
												</option>
											))}
										</select>
									</td>
								</tr>
								<tr>
									<td className='boldColumn'>Price per person:</td>
									<td>{tour.price_person} €</td>
								</tr>
								<tr>
									<td className='boldColumn'>How many people:</td>
									<td>
										<select value={people} onChange={e => setPeople(Number(e.target.value))}>
											{[...Array(10).keys()].map(i => (
												<option key={i + 1} value={i + 1}>
													{i + 1}
												</option>
											))}
										</select>
									</td>
								</tr>
								<tr>
									<td className='boldColumn'>FinalPrice per person:</td>

									<td>{tour.price_person * people} €</td>
								</tr>
								<tr>
									<td className='boldColumn'>Booking Date:</td>
									<td>
										<input className='date' type='date' value={bookingDate} onChange={e => setBookingDate(e.target.value)} />
									</td>
								</tr>
								<tr>
									<td colSpan='2'>
										<button typr='submit' className='button'>
											Add New Booking
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div>
					<img src={`${baseDomain}${tour.images}`} alt={`${tour.tour_name} image`} className='imgTour' />
				</div>
				<div className='tourContainer'>
					<Link href={'/home'}>
						<button className='button'>Return main page</button>
					</Link>
					<Link href={`/tours/`}>
						<button className='button'>Return to Tours List</button>
					</Link>
					{/* <div className='button'>
						<button >Send to Shopping Cart!</button>
						<ClientBookingRegistrationView />
					</div> */}
				</div>
			</div>
			<FooterBar />
		</>
	);
}
export default TourDetailView;
