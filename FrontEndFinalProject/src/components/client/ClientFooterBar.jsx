import { Link } from 'wouter';

function ClientFooterBar() {
	return (
		<>
			<footer>
				<div className='footerContainer'>
					<div className='footerCard'>
						<a href='https://www.instagram.com/insideexperiences/' target='_blank'>
							<h3>Social Media</h3>
						</a>
					</div>
					<div className='footerCard'>
						<Link href='/aboutus'>
							<h3>About Us</h3>
						</Link>
					</div>
				</div>
			</footer>
		</>
	);
}

export default ClientFooterBar;
