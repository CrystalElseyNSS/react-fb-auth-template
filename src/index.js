import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";

const firebaseConfig = {
  apiKey: 'AIzaSyA6D48LKH9oE7e7bOBWD3aroPDm7TltL_4'
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
