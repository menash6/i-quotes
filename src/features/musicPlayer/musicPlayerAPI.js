// A mock function to mimic making an async request for data
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { ref, child, get } from "firebase/database";
import {
  listAll,
  ref as storageRef,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";

import { db, database, storage } from "../../firebase.ts";

export async function fetchMusicUrls(folder) {
  const musicRef = storageRef(storage, folder);
  console.log("fetchMusic");

  return listAll(musicRef)
    .then((res) => {
      return res.items.map((trackRef) => getDownloadURL(trackRef));
    })
    .then((urlPromises) => {
      return Promise.all(urlPromises);
    });
}

// export async function fetchMusic() {
//   const musicRef = storageRef(storage, "music/");
//   console.log("fetchMusic");

//   return listAll(musicRef)
//     .then((res) => {
//       return res.items.map((trackRef) => ({
//         url: getDownloadURL(trackRef),
//         name: getMetadata(trackRef),
//       }));
//       // return res.items.map((trackRef) => getDownloadURL(trackRef));
//     })
//     .then((urlPromises) => {
//       return Promise.all(urlPromises);
//     });
// }

export async function fetchMusicMetadata(folder) {
  const musicRef = storageRef(storage, folder);
  console.log("fetchMusicMetadata");

  return listAll(musicRef)
    .then((res) => {
      return res.items.map((trackRef) => getMetadata(trackRef));
    })
    .then((urlPromises) => {
      return Promise.all(urlPromises);
    });
}

export async function fetchMusicFromFolder(folder) {
  const urlsResponse = await fetchMusicUrls(folder);
  const metadataResponse = await fetchMusicMetadata(folder);
  console.log("fetchAsyncMusic:", folder, " urlsResponse", urlsResponse);
  console.log(
    "fetchAsyncMusic: ",
    folder,
    "metadataResponse",
    metadataResponse
  );
  const names = metadataResponse.map((e) => e.name);

  const response = names.map(function (value, index) {
    return { title: value, url: urlsResponse[index] };
  });

  return response;
}

// export async function fetchMusic() {
//   const musicRef = storageRef(storage, "music/focus/");
//   console.log("fetchMusic");

//   return listAll(musicRef)
//     .then((res) => {
//       return res.items.map((trackRef) => getDownloadURL(trackRef));
//     })
//     .then((urlPromises) => {
//       return Promise.all(urlPromises);
//     });
// }
// export async function fetchMusicMetadata() {
//   const musicRef = storageRef(storage, "music/focus/");
//   console.log("fetchMusic");

//   return listAll(musicRef)
//     .then((res) => {
//       return res.items.map((trackRef) => getMetadata(trackRef));
//     })
//     .then((urlPromises) => {
//       return Promise.all(urlPromises);
//     });
// }

export const filterCategories = [
  "new_label",
  "morning",
  "focus",
  "workout",
  "night",
]; // all catergories indexed 0-1-2-3
