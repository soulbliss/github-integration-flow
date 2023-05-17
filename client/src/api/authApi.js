import Utils from "../_helpers/Utils";

export async function login(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };
  localStorage.removeItem("user");
  return fetch("api/session/login", requestOptions)
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
  return fetch("api/session/logout", requestOptions).then(Utils.handleResponse);
}

export async function verifyEmail({ userId, token }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, token }),
    redirect: "manual"
  };
  return fetch("/api/user/verify_email", requestOptions)
    .then(Utils.handleResponse)
    .then(response => {
      if (response.success) {
        return response.redirectUrl;
      }
    })
    .catch(error => {
      console.error("Error fetching redirect URL:", error);
    });
}

export async function register(user) {
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
