/* Templates */
import tplHome from '../html/home.tpl.html';
import tplAbout from '../html/about.tpl.html';
import tplContact from '../html/contact.tpl.html';
import tplAdmin from '../html/admin.tpl.html';
import tplAdminAuth from '../html/admin_auth.tpl.html';

/* Firebase */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

/* Js */
import './config';
import { signIn, signOut, signInGitHub, signOutGitHub, signOutGoogle, signInGoogle } from './auth';
import savePhoto from './save_photo';
import showPhotos from './show_photos';
import deletePhoto from './delete_photo';
import aboutImage1 from '../img/fifi.jpg';
import aboutImage2 from '../img/amor-de-ninos.jpg';

const routes = () => {

	const d = document,
				main = d.querySelector('.main');

	d.addEventListener('DOMContentLoaded', e => {
		main.innerHTML = tplHome;
		showPhotos();
	});

	d.addEventListener('click', e => {
		
		if ( e.target.matches('a[href="#"]') ) {
			e.preventDefault();
		}

		if ( e.target.matches('#home') ) {
			main.innerHTML = tplHome;
			showPhotos();
		} 
		
		else if ( e.target.matches('#about') ) {
			main.innerHTML = tplAbout;
			d.querySelector('.about-header').innerHTML = `
				<img src="${ aboutImage1 }" alt="Fifi" title="Fifi">
				<img src="${ aboutImage2 }" alt="Amor De Niños" title="Amor De Niños">
			`;
		}
		
		else if ( e.target.matches('#contact') ) {
			main.innerHTML = tplContact;
		}
		
		else if ( e.target.matches('#admin') ) {

			firebase.auth().onAuthStateChanged(  user => {
				if ( user ) {
					main.innerHTML = tplAdminAuth;
					d.querySelector('.admin-name').textContent = user.displayName;
					d.querySelector('.admin-avatar').src = user.photoURL;
					savePhoto();
					showPhotos();
				} else {
						main.innerHTML = tplAdmin;
					}

			});
			
		}

		else if ( e.target.matches('#login-github') ) {
			signInGitHub();
		}

		else if ( e.target.matches('#login-google') ) {
			signInGoogle();
		}
		
		else if ( e.target.matches('#logout') ) {
			signOutGitHub();
			signOutGoogle();
		}

		else if ( e.target.matches('.fa-trash') ) {
			deletePhoto(  e.target.dataset.photo, e.target.dataset.id );
		}

	});

	d.addEventListener('change', e => {
		if ( e.target.matches('input[type="file"]') ) {
			d.querySelector('.form-uploader input[type="text"]').value = e.target.value;
		}
	});

}

export default routes;