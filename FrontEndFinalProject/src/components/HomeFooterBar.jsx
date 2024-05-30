import { Link } from 'wouter';

function HomeFooterBar() {
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
						<Link href='/client/login'>
							<h3>Client Login</h3>
						</Link>
					</div>
					<div className='footerCard'>
						<Link href='client/registration'>
							<h3>Client Registration</h3>
						</Link>
					</div>
				</div>
			</footer>
		</>
	);
}

export default HomeFooterBar;
