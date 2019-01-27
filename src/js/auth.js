import firebase from 'firebase/app';

const providerGoogle = new firebase.auth.GoogleAuthProvider();

const providerGitHub = new firebase.auth.GithubAuthProvider();

export const signInGitHub = () => firebase.auth().signInWithPopup(providerGitHub);
export const signOutGitHub = () => firebase.auth().signOut();


export const signInGoogle = () => firebase.auth().signInWithPopup(providerGoogle);
export const signOutGoogle = () => firebase.auth().signOut();