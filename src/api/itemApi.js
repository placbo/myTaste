import {handleResponse, handleError} from "./apiUtils";

const baseUrl = process.env.REACT_APP_API_URL + "mytaste/items/";

export function getItems() {
    return fetch(baseUrl)
        .then(handleResponse)
        .catch(handleError);
}

export function getItem(id) {
    return fetch(baseUrl + id)
        .then(handleResponse)
        .catch(handleError);
}


export function saveItems(item) {
    const id = item._id;
    delete item._id;
    return fetch(baseUrl + (id || ""), {
        method: id ? "PUT" : "POST",
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
