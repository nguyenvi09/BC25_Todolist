import { URL_API } from "./../config/constants.js";

export default class Services {
  callApi(uri, method, data) {
    return axios({
      url: URL_API + uri,
      method,
      data,
    });
  }
}
