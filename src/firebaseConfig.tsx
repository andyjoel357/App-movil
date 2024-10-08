
import { initializeApp } from "firebase/app";
import { initializeAuth,getReactNativePersistence } from "firebase/auth";
import  ReactNativeAsyncStorage  from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCmEF7Yetb8GvaBn55M6mwvTkoHh16StN8",
  authDomain: "productnatura-b20dc.firebaseapp.com",
  projectId: "productnatura-b20dc",
  storageBucket: "productnatura-b20dc.appspot.com",
  messagingSenderId: "532591278531",
  appId: "1:532591278531:web:a65b8ca8bddf7a6ad2e576",
  databaseURL:"https://productnatura-b20dc-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebase,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const database = getDatabase(firebase);