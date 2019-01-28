import firebase from 'firebase/app';

const providerGoogle = new firebase.auth.GoogleAuthProvider();

export const signInGoogle = () => firebase.auth().signInWithPopup(providerGoogle);
export const signOutGoogle = () => firebase.auth().signOut();