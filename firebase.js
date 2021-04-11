import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA8zlQL39hNcBoP7Drkqo1zURyCDI00l6s',
  authDomain: 'vb-gerlin.firebaseapp.com',
  projectId: 'vb-gerlin',
  storageBucket: 'vb-gerlin.appspot.com',
  messagingSenderId: '915212531571',
  appId: '1:915212531571:web:8c736dd3b5352140ab7706',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = app.auth();

export { db, auth };
