import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true
})

const apiConnector = (method, url, bodyData, params, headers) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    params: params ? params : null,
    headers: headers ? headers : null,
  });
};

export default apiConnector;
