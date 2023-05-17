import Utils from "../_helpers/Utils";

export function login(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };
  localStorage.removeItem("user");
  return fetch("/session/login", requestOptions)
    .then(Utils.handleResponse)
    .then(response => {
      let user = Utils.addExpiryToUserSession({ user: response.user, expireInDays: 14 });
      localStorage.setItem("user", JSON.stringify(user));
      return response;
    });
}
export function logout() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  localStorage.removeItem("user");
  return fetch("/session/logout", requestOptions).then(Utils.handleResponse);
}

export function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };
  localStorage.removeItem("user");
  return fetch("/api/user", requestOptions)
    .then(Utils.handleResponse)
    .then(response => {
      return response;
    });
}