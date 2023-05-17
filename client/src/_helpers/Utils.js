import * as authApi from "../api/authApi";
import { history } from "./history";

let Utils = {
  handleResponse: response => {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (response.status !== 200 && response.status !== 201) {
        if (response.status === 401 && data.requireLogin) {
          localStorage.removeItem("user");
          authApi.logout().then(() => {
            history.push("/signin");
          });
        }
        throw data;
      }
      return data;
    });
  },
  handleResponseAndHeaders: response => {
    let headers = response.headers;
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (response.status !== 200 && response.status !== 201) {
        if (response.status === 401 && data.requireLogin) {
          localStorage.removeItem("user");
          authApi.logout().then(() => {
            history.push("/signin");
          });
        }
        throw data;
      }
      return { data, headers };
    });
  },
  addExpiryToUserSession({ user, expireInDays }) {
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expireInDays);
    expiryDate = expiryDate.valueOf();
    user.exp = expiryDate;
    return user;
  }
};
export default Utils;
