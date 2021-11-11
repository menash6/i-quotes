// A mock function to mimic making an async request for data
import { collection, getDocs } from "firebase/firestore/lite";
import { ref, child, get } from "firebase/database";

import { db, database } from "../../firebase.ts";

export async function fetchQuotes() {
  const dbRef = ref(database, "sheets/");
  console.log({ dbRef });
  const snapshot = await get(child(dbRef, "all_quotes"));
  console.log({ snapshot });

  if (snapshot.exists()) {
    const snapshotValue = snapshot.val();
    // console.log("snapshot key and ref ", snapshot.key, snapshot.ref);
    // console.log("snapshot toJSON() ", snapshot.toJSON());
    // console.log("snapshot.val is ", snapshotValue);
    const quoteInOneArray = [];
    snapshot.forEach((child) => {
      quoteInOneArray.push({ id: parseInt(child.key), ...child.val() });
    });

    return quoteInOneArray;
    // resolve(snapshotValue);
  } else {
    console.warn("No quotes available");
  }
}

export async function fetchCategories() {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `sheets/Categories`));
  if (snapshot.exists()) {
    const snapshotValue = snapshot.val();
    // console.log(
    //   "fetchCategories snapshot key and ref ",
    //   snapshot.key,
    //   snapshot.ref
    // );
    // console.log("fetchCategories snapshot val() ", snapshot.val());

    // const quoteInOneArray = [];
    // snapshot.forEach((child) => {
    //   quoteInOneArray.push({ id: child.key, ...child.val() });
    // });

    // return quoteInOneArray;
  } else {
    console.warn("No categories available");
  }
}

export const speakersMap = ["am", "ld", "jc"]; //id 0:Marcus, id1:Lila, id2:Jada
export const proxyurl = "";

export const audioPath = "http://day1journey.com/wp-content/uploads/2021/09/";
