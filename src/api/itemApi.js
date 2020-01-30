import { handleResponse, handleError } from "./apiUtils";

export const ITEMS_URL =
  process.env.REACT_APP_MYTASTE_API_HOST + "/mytasteapi/items/";

export function getItem(id) {
  return fetch(ITEMS_URL + id)
    .then(handleResponse)
    .catch(handleError);
}

export function saveItem(item) {
  const id = item._id;
  delete item._id;
  return fetch(ITEMS_URL + (id || ""), {
    method: id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(item)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteItem(itemId) {
  return fetch(ITEMS_URL + itemId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
