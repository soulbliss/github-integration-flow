import Utils from "../_helpers/Utils";

export async function sendAuthorizationToken(authorizationCode, installationId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authorizationCode, installationId })
  };
  return fetch("api/oauth/callback", requestOptions)
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

export async function getListOfRepositoriesForUser() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  return fetch("api/integration/github/getListOfRepositoriesForUser", requestOptions)
    .then(Utils.handleResponse)
    .then(response => {
      return response
    })
    .catch(error => {
      console.error("Error fetching token", error);
    });
}
