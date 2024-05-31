import { Link } from 'wouter';
function NotFoundPageView() {
	return (
		<>
			<div className='secondTitle'>
				<h2>
					Page Not Found
					<br />
					-- 404 --
				</h2>
			</div>
			<div className='countainerPageNF'>
				<img src='/img/404_page-not-found.png' alt='Page Not Found 404' style={{ maxWidth: '100%' }} />
			</div>
			<Link href={'/'}>
				<button className='button'>return to mainpage</button>
			</Link>
		</>
	);
}

export default NotFoundPageView;
