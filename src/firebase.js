import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

import {
  listAll,
  ref as storageRef,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfQPnEd3IOtWdDh9Abr1Kg8TtDOGwdKZA",
  authDomain: "iquotes-dd0ad.firebaseapp.com",
  databaseURL: "https://iquotes-dd0ad-default-rtdb.firebaseio.com/",
  projectId: "iquotes-dd0ad",
  storageBucket: "iquotes-dd0ad.appspot.com",
  messagingSenderId: "743947428082",
  appId: "1:743947428082:web:f078f0e0c0723cdc58f06b",
  //   measurementId: "G-4YWVBN3HTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export async function fetchFilesFromFolder(folder) {
  const urlsResponse = await fetchFilesUrls(folder);
  const metadataResponse = await fetchFilesMetadata(folder);
  // console.log("fetchFilesFromFolder:", folder, " urlsResponse", urlsResponse);
  // console.log(
  //   "fetchFilesFromFolder: ",
  //   folder,
  //   "metadataResponse",
  //   metadataResponse
  // );
  const names = metadataResponse.map((e) => e.name);

  const response = names.map(function (value, index) {
    return { title: value, url: urlsResponse[index] };
  });

  return response;
}

export async function fetchFilesUrls(folder) {
  const filesRef = storageRef(storage, folder);
  // console.log("fetchFilesUrls in folder:", folder);

  return listAll(filesRef)
    .then((res) => {
      return res.items.map((trackRef) => getDownloadURL(trackRef));
    })
    .then((urlPromises) => {
      return Promise.all(urlPromises);
    });
}

export async function fetchFilesMetadata(folder) {
  const filesRef = storageRef(storage, folder);
  // console.log("fetchFilesMetadata in folder:", folder);

  return listAll(filesRef)
    .then((res) => {
      return res.items.map((trackRef) => getMetadata(trackRef));
    })
    .then((urlPromises) => {
      return Promise.all(urlPromises);
    });
}
