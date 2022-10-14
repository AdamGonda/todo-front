export const host = "http://localhost:8080";

export const makeGetRequest = (url, onSuccess, onError) => {
  fetch(`${host}/${url}`)
    .then((res) => res.json())
    .then((json) => onSuccess(json))
    .catch((err) => onError(err));
};

export const makeRequest = (method, url, payload, onSuccess, onError) => {
  fetch(`${host}/${url}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  })
    .then((res) => onSuccess(res))
    .catch((err) => onError(err));
};
