export async function handleResponse(response) {
  //TODO: remove when fetch is replaced by ajax
  if (response.ok) return response.json();
  throw new Error("Network response was not ok.");
}

export async function handleAjaxResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else if (response.status === 204) {
    return null;
  } else {
    throw new Error(
      `Network response was not OK. (${response.status}) ${response.statusText}`
    );
  }
}

export function handleError(error) {
  //TODO: remove when fetch is replaced by ajax
  console.error("API call failed. " + error);
  throw error;
}

export function handleAjaxError(error) {
  if (error.response?.status === 404) {
    return null;
  }
  throw new Error(`API call failed. (${error})`);
}
