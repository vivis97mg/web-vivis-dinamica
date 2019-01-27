import styles from './scss/main.scss';
import toggleNav from './js/toogle_nav';
import routes from './js/routes';

const footerYear = document.querySelector('.footer-year');

footerYear.textContent = new Date().getFullYear();
toggleNav();
routes();