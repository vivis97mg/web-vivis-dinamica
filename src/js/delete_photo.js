/* Firebase */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

/* Js */
import './config';

function deletePhoto(photo, uid) {
	const d = document,
				db = firebase.database(),
				storage = firebase.storage(),
				photos = d.getElementById('photos');

	let isDelete = confirm('¿Estas seguro de eliminar la foto?');

	if ( isDelete ) {
		storage.refFromURL(photo).delete()
		.then( () => db.ref(`photos/${ uid }`).remove() );
	}

	db.ref().child('photos').on('child_removed', data => {
		let toDelete = d.getElementById(data.key);
		photos.removeChild(toDelete);
	})
}

export default deletePhoto;