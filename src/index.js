import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
