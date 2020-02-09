import {
  handleResponse,
  handleError,
  handleAjaxResponse,
  handleAjaxError
} from "./apiUtils";
import Axios from "axios";

export const ITEMS_URL = process.env.REACT_APP_MYTASTE_API_HOST + "/items/";

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${window.localStorage.getItem('jwt')}`,
  "Access-Control-Allow-Credentials": true,
};


export function getAllItems() {
  return Axios.get(ITEMS_URL, { headers: headers })
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
