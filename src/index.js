import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store';
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBhbNOt5zf5OkuZ-k0lDOFwEL2nCVa_n28",
  authDomain: "sahayata-8e3ae.firebaseapp.com",
  databaseURL: "https://sahayata-8e3ae.firebaseio.com",
  projectId: "sahayata-8e3ae",
  storageBucket: "sahayata-8e3ae.appspot.com",
  messagingSenderId: "224007737077",
  appId: "1:224007737077:web:c12fdbb0f1c5f36d88ffbc",
  measurementId: "G-XRPYZX2KSM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  ,document.getElementById('root')
  
);