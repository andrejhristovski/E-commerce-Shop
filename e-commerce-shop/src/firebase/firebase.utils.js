import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCN4FkoV62KS8ifgM4JTGo3CjbNkBz37G8",
  authDomain: "e-commerce-c2d2b.firebaseapp.com",
  databaseURL: "https://e-commerce-c2d2b.firebaseio.com",
  projectId: "e-commerce-c2d2b",
  storageBucket: "e-commerce-c2d2b.appspot.com",
  messagingSenderId: "54293616034",
  appId: "1:54293616034:web:b14ee88f791acbbd508efb",
  measurementId: "G-GYD9MLT8P4",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
