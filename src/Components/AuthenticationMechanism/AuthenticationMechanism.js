import "firebase/auth";
import * as firebase from "firebase/app";
import firebaseConfig from './firebaseConfig.config';
import { pushSessionStorage, signOutSessionClean } from "../SessionStorageMechanism/SessionStorageMechanism";

firebase.initializeApp(firebaseConfig);
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const googleSignIn = () => {
    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { uid, displayName, email, photoURL } = result.user;
            return newUser(uid, displayName, email, photoURL);
        })
        .catch(error => {
            return error.message;
        });
}

export const storeAuthTokens = () => {
    return firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
            if (idToken !== null) {
                return idToken;
            }
        }).catch(function (error) {
            return;
        });

}


export const signOut = () => {
    firebase.auth().signOut().then(function () {
        signOutSessionClean();
        alert("Signout Successful");
        document.location.reload();
    }).catch(function (error) {
        alert(error.code);
    });

}

const newUser = (uid, displayName, email, photoURL, emailVerified) => {

    const newUser = {
        uid: uid,
        name: displayName,
        email: email,
        photoURL: photoURL,
        emailVerified: emailVerified
    }

    return newUser;
}

