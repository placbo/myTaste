import {
  handleResponse,
  handleError,
  handleAjaxResponse,
  handleAjaxError
} from "./apiUtils";
import Axios from "axios";

export const ITEMS_URL = process.env.REACT_APP_MYTASTE_API_HOST + "/items/";
export const PROFILE_URL =
  process.env.REACT_APP_MYTASTE_API_HOST + "/userprofile";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export function getAllItems() {
  return Axios.get(ITEMS_URL, {
    withCredentials: true,
    headers: headers
  })
    .then(handleAjaxResponse)
    .catch(handleAjaxError);
}
export function getUserProfile() {
  return Axios.get(PROFILE_URL, { headers: headers })
    .then(handleAjaxResponse)
    .catch(handleAjaxError);
}

export function getItem(id) {
  return Axios.get(ITEMS_URL + id, { headers: headers })
    .then(handleAjaxResponse)
    .catch(handleAjaxError);
}

export function saveItem(item) {
  const id = item._id;
  delete item._id;
  //TODO: Axios
  return fetch(ITEMS_URL + (id || ""), {
    method: id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(item)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteItem(itemId) {
  //TODO: Axios
  return fetch(ITEMS_URL + itemId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
