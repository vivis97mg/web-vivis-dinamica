const toggleNav = () => {
	const d = document,
				headerBtn = d.querySelector('.header-btn'),
				header = d.querySelector('.header'),
				main = d.querySelector('.main');

	headerBtn.addEventListener('click', e => {
		e.preventDefault();
		header.classList.toggle('is-active');
		headerBtn.classList.toggle('is-active');
		main.classList.toggle('is-active');
	});

	d.addEventListener('click', e => {

		if ( e.target.matches('a[href="#"]') ) {
			e.preventDefault();
			header.classList.remove('is-active');
			headerBtn.classList.remove('is-active');
			main.classList.remove('is-active');
		}
		
	});
}

export default toggleNav;