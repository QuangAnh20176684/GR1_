import axios from "axios";
const BASE_URL = "http://localhost:5000/api";
const getOptions = (options) => {
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };
  const accessToken = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.auth
  )?.currentUser?.accessToken;
  console.log("accessToken: ", accessToken);
  if (accessToken) {
    opts.headers.authorization = "Bearer " + accessToken;
  }

  return opts;
};

export const getTokenSource = () => {
  return axios.CancelToken.source();
};

export const GET = (path, params, options = {}) => {
  const _params = params
    ? Object.keys(params)
        .map((key) => {
          let valueParam = params[key];
          let adjustParam = "";
          if (Array.isArray(valueParam)) {
            // TODO with "all" value;
            adjustParam = valueParam
              .map(
                (paramDetail) =>
                  `${key}=${encodeURIComponent(
                    paramDetail != "all" ? paramDetail : ""
                  )}`
              )
              .join("&");
          } else {
            // TODO with "all" value;
            valueParam = valueParam != "all" ? valueParam : "";
            adjustParam = `${key}=${encodeURIComponent(valueParam)}`;
          }
          return adjustParam;
        })
        .join("&")
    : "";

  const _url =
    (options.isFullPath ? path : BASE_URL + path) +
    (_params === "" ? "" : "?" + _params);

  const _options = getOptions(options);
  _options.urlPath = path;

  return axios.get(_url, _options).then((response) => response.data);
};

export const POST = (path, params, options = {}) => {
  const _url = options.isFullPath ? path : BASE_URL + path;
  const _options = getOptions(options);
  _options.urlPath = path;

  return axios.post(_url, params, _options).then((response) => response.data);
};

export const PUT = (path, params, options = {}) => {
  const _url = options.isFullPath ? path : BASE_URL + path;
  const _options = getOptions(options);
  _options.urlPath = path;

  return axios.put(_url, params, _options).then((response) => response.data);
};

export const PATCH = (path, params, options = {}) => {
  const _url = options.isFullPath ? path : BASE_URL + path;
  const _options = getOptions(options);
  _options.urlPath = path;

  return axios.patch(_url, params, _options).then((response) => response.data);
};

export const DELETE = (path, params, options = {}) => {
  const _url = options.isFullPath ? path : BASE_URL + path;
  const _options = getOptions(options);
  _options.urlPath = path;

  // delete with params;

  if (params) {
    _options.data = params;
  }

  return axios.delete(_url, _options).then((response) => response.data);
};

export const UPLOAD = (path, files, options, onProgress = () => {}) => {
  const _url = options.isFullPath ? path : BASE_URL + path;

  const _form = new FormData();
  _form.append("type", files.type);
  _form.append("files", files);

  const _options = getOptions(options);
  _options.headers["Content-Type"] = "multipart/form-data";
  _options.onUploadProgress = onProgress;
  _options.urlPath = path;

  return axios.post(_url, _form, _options).then((response) => response.data);
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
