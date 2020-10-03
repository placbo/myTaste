import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDLJMQU6rx2L5bOszJ6ZgT2SwGEsDxK7rQ",
    authDomain: "mytaste-app.firebaseapp.com",
    databaseURL: "https://mytaste-app.firebaseio.com",
    projectId: "mytaste-app",
    storageBucket: "mytaste-app.appspot.com",
    messagingSenderId: "414485531416",
    appId: "1:414485531416:web:a537fe3c24c3938758ec6d",
    measurementId: "G-X0M0TN3M19"
};


firebase.initializeApp(firebaseConfig);

if (process.env.REACT_APP_MOCK_API!=="true") {
    firebase.analytics();
}

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider); //TODO: changed - does it still work??
};


export default firebase;
