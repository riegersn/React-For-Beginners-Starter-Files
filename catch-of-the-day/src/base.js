import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD-BYWurcOLU7xPTwcz43jZcJrGjZL-9PM",
  authDomain: "catch-of-the-day-shawnr.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-shawnr.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp }
export default base;