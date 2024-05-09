import FooterBar from '../components/FooterBar';
import GuidesList from '../components/GuidesList';
import NavBar from '../components/NavBar';

function AboutUsView() {
	return (
		<>
			<NavBar />
			<div className='aboutUsContainer'>
				<h2>Amarante Experiences</h2>
				<div className='companyContainer'>
					<p>
						We embody our Logo!
						<br />
						We encapsulate the invigorating essence of the Marão Mountain landscapes and the rich history of the Aboboreira Mountain. Our identity resonates with the very essence of Vinho Verde. We
						proudly uphold the cherished traditions of our gastronomy and conventual pastry-making. Our narrative intertwines with the storied past of the St. Gonçalo Bridge. The leaf within our
						emblem symbolizes our deep-rooted passion for nature, the crispness of fresh air, and the liberating sensation of freedom. It represents an experience etched in memory for a lifetime.
					</p>
					<img src='/img/logo.png' alt='Amarante Experiences Logo' className='imgLogo' />
				</div>

				<div className=''>
					<GuidesList />
				</div>
			</div>
			<FooterBar />
		</>
	);
}

export default AboutUsView;
