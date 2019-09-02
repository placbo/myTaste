import {handleResponse, handleError} from "./apiUtils";

const baseUrl = process.env.REACT_APP_API_URL + "/firebase/";

export function getItems() {
    return fetch(baseUrl + "items/")
        .then(handleResponse)
        .catch(handleError);
}

export function getItem(id) {
    return fetch(baseUrl + "item/" + id)
        .then(handleResponse)
        .catch(handleError);
}


export function saveItems(item) {
    return fetch(baseUrl + "upload/", {
        method: "POST", // POST for create, PUT to update when id already exists.
        headers: {"content-type": "application/json"},
        body: JSON.stringify(item)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteItem(itemId) {
    return fetch(baseUrl + itemId, {method: "DELETE"})
        .then(handleResponse)
        .catch(handleError);
}
