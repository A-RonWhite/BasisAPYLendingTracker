// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk4NCe0UbO4JVv3NM5cUrOTwNk4i_fU-4",
  authDomain: "average-apy-tracker.firebaseapp.com",
  projectId: "average-apy-tracker",
  storageBucket: "average-apy-tracker.appspot.com",
  messagingSenderId: "163842745130",
  appId: "1:163842745130:web:cffb131e78732de0b6b453",
  measurementId: "G-6SR6Z5GES1",
};

// Initialize Firebase
/* const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 */
//npm install -g firebase-tools

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = firebaseConfig;

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

initializeApp();

const aTuringRef = db.collection("APYDump").doc("BASIS");

aTuringRef.set({
  "12/02/2022, 14:37:37": 865,
});
