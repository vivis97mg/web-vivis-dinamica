import firebase from 'firebase/app';

const config = {
	apiKey: "AIzaSyCy5pOdR7NeKMDzlCm03dMK-2evuXMDcUo",
	authDomain: "web-vivis-dinamica.firebaseapp.com",
	databaseURL: "https://web-vivis-dinamica.firebaseio.com",
	projectId: "web-vivis-dinamica",
	storageBucket: "web-vivis-dinamica.appspot.com",
	messagingSenderId: "1034417881051"
};

const init = () => firebase.initializeApp(config);

init();