/* Firebase */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

/* Js */
import './config';

const d  = document;

function saveInDb(uid, title, photo) {
	let db = firebase.database().ref().child('photos');

	db.push({
		uid,
		title,
		photo
	});
}

function uploadPhoto(photo) {
	let photoName = `${ new Date().getTime() }_${ photo.name }`;

	const photosRef = firebase.storage().ref().child('photos'),
				progressBar = d.getElementById('progress-bar'),
				progressAdvance = d.getElementById('progress-advance');

	let uploader = photosRef.child(photoName).put(photo);

	progressBar.classList.remove('u-none');
	progressAdvance.classList.remove('u-none');

	uploader.on(
		'state_changed',
		data => {
			let progress = Math.floor( (data.bytesTransferred / data.totalBytes) * 100 );

			progressBar.value = progress;
			progressAdvance.textContent = `${progress}%`;
		},
		err => {
			progressAdvance.innerHTML = `
				<p class="u-message">
					${ err.code } - ${ err.message }
				</p>
			`;
		},
		() => {
			const photoUrl = photosRef.child(photoName),
						uid = firebase.auth().currentUser.uid,
						title = d.querySelector('input[name="title"]').value;

			uploader = null;
			photoUrl
				.getDownloadURL()
				.then( url => saveInDb(uid, title, url) )
				.then( () => {
					progressBar.value = 0;
					progressAdvance.textContent = null;
					progressBar.classList.add('u-none');
					progressAdvance.classList.add('u-none');
					d.getElementById('form-save-photo').reset();
				})
		}
	)
};

function savePhoto() {
	d.addEventListener('submit', e => {

		if ( e.target.matches('#form-save-photo') ) {
			e.preventDefault();

			let photo = e.target.photo.files[0];

			if ( photo.type.match('image.*') ) {
				uploadPhoto(photo);
			} else {
				e.target.querySelector('.u-message').innerHTML = `
				El archivo que intentas subir no es una imagen
				<br>
				<i class="fas fa-sad-cry"></i>`;
			}
		}

	});
}

export default savePhoto;