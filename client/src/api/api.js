import {handleAjaxError, handleAjaxResponse, handleError, handleResponse} from "./apiUtils";
import Axios from "axios";
import * as firebase from "firebase";

export const ITEMS_URL = process.env.REACT_APP_MYTASTE_API_HOST + "/items";
export const PROFILE_URL =
    process.env.REACT_APP_MYTASTE_API_HOST + "/userprofile";
export const RATE_ITEM_URL = process.env.REACT_APP_MYTASTE_API_HOST + "/rating";


export const ITEM_COLLECTION_NAME = "items";


const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export function getAllItems() {
  if (process.env.REACT_APP_USE_MOCK === "true") {
    return new Promise((resolve, reject) => {
      let MOCK_DATA = [
        {_id: "1", title: "Item 1", "image": "", "comment": "fsdfsdfsdf"},
        {_id: "2", title: "Item 2", "image": "", "comment": "jadda"},
        {_id: "3", title: "Item 3", "image": "", "comment": "joda"},
      ];
      console.log("Mock retrieving list")
      resolve(MOCK_DATA);
    });
  }
  return firebase
      .firestore()
      .collection(ITEM_COLLECTION_NAME)
      .onSnapshot(snapshot => {
        debugger;
      })
      // .get()
      // .then((doc) => {
      //   return doc.data();
      // });
}

export function getUserProfile() {
  return Axios.get(PROFILE_URL, { headers: headers })
    .then(handleAjaxResponse)
    .catch(handleAjaxError);
}

export function getItem(itemId) {
  return Axios.get(ITEMS_URL + "/" + itemId, { headers: headers })
    .then(handleAjaxResponse)
    .catch(handleAjaxError);
}

export function rateItem(itemId, userId, rating) {
  return Axios.put(
    RATE_ITEM_URL,
    { itemId, userId, rating },
    { headers: headers }
  )
    .then(handleAjaxResponse)
    .catch(handleAjaxError);
}

export function getRating(itemId, userId) {
  return Axios.get(`${RATE_ITEM_URL}/${itemId}/${userId}`, { headers: headers })
    .then(handleAjaxResponse)
    .catch(handleAjaxError);
}

export function getAverageRating(itemId) {
  return Axios.get(`${RATE_ITEM_URL}/${itemId}`, {headers: headers})
      .then(handleAjaxResponse)
      .catch(handleAjaxError);
}


export function saveItem(item) {
  if (process.env.REACT_APP_USE_MOCK === "true") {
    console.log("Mock saving item")
    return;
  }
  return firebase
      .firestore()
      .collection(ITEM_COLLECTION_NAME)
      .doc(item.id)
      .set(item)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error updating/creating document: ", error);
      });
}


export function deleteItem(itemId) {
  //TODO: Axios
  return fetch(ITEMS_URL + "/" + itemId, {method: "DELETE"})
      .then(handleResponse)
      .catch(handleError);
}
