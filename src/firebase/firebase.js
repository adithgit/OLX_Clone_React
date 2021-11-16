// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import {getFirestore} from 'firebase/firestore'

import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBKS4qW8YuuhwzB8TqhttnWID0VNylkd30",

  authDomain: "olx-clone-3f495.firebaseapp.com",

  projectId: "olx-clone-3f495",

  storageBucket: "olx-clone-3f495.appspot.com",

  messagingSenderId: "346054970622",

  appId: "1:346054970622:web:9290956ea04ccf3bb3a9af",

  measurementId: "G-XSH3NL1W6Q"

};


// Initialize Firebase

const firebase =  initializeApp(firebaseConfig);
export default firebase
export const db = getFirestore()
export const storage = getStorage(firebase);