import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store';
import firebase from "firebase";
var firebaseConfig = {
  // firebase config data
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  ,document.getElementById('root')
  
);
