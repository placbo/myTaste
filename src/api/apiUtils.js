export async function handleResponse(response) {
//TODO: remove when fetch is replaced by ajax
  if (response.ok) return response.json();
  throw new Error("Network response was not ok.");
}

export async function handleAjaxResponse(response) {
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 204) {
    return null;
  } else {
      throw new Error(`Network response was not OK. (${response.statusText})${response.statusText}`);
  }
}

export function handleError(error) {
//TODO: remove when fetch is replaced by ajax
  console.error("API call failed. " + error);
  throw error;
}

export function handleAjaxError(error) {
  console.log(error);
  throw new Error(`API call failed. (${error})`);
}




