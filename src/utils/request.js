import QueryString from 'query-string';

import config from '../configs';
import Auth from './auth';
import CaseConverter from './caseConverter';

export function ServerAPIError(json) {
  this.name = 'ServerAPIError';
  this.data = json;
  this.stack = (new Error()).stack;
}
ServerAPIError.prototype = Object.create(Error.prototype);
ServerAPIError.prototype.constructor = ServerAPIError;

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// data.A.data.B.data.C => A.B.C
export const removeDataProperty = (obj) => {
  // if obj is primitive types
  if (!(obj instanceof Object)) return obj;

  // if argument is an array, recursive this function with each element of array
  if (Array.isArray(obj)) {
    const newArray = [];
    obj.forEach((element) => {
      const value = removeDataProperty(element);
      newArray.push(value);
    });
    return newArray;
  }

  // if argument is a normal object
  const keys = Object.keys(obj);
  if (keys.length === 1 && keys[0] === 'data') {
    return removeDataProperty(obj.data);
  }
  const newObject = {};
  keys.forEach((key) => {
    newObject[key] = removeDataProperty(obj[key]);
  });
  return newObject;
};

const request = async (url, method, body, customHeaders = {}) => {
  let endpoint = url;
  if (!url.startsWith('http')) {
    endpoint = config.apiUrl + url;
  }
  const headers = {
    ...defaultHeaders,
    ...customHeaders,
  };

  const token = Auth.getToken();
  if (token) {
    // Set empty Bearer can cause setRequestHeader error in old safari version
    headers.Authorization = `Bearer ${token}`;
  }
  let data = null;
  if (body) {
    if (headers['Content-Type'] === 'application/json') {
      data = JSON.stringify(CaseConverter.camelCaseToSnakeCase(body));
    } else {
      delete headers['Content-Type'];
      data = body;
    }
  } else {
    delete headers['Content-Type'];
  }

  const fetchOpts = {
    method,
    headers,
  };
  if (method !== 'HEAD' && method !== 'GET') {
    fetchOpts.body = data;
  }

  const start = Date.now();
  const response = await fetch(endpoint, fetchOpts);
  const end = Date.now();
  const responseTime = end - start;

  let json = await response.json();
  json = removeDataProperty(json);
  json = CaseConverter.snakeCaseToCamelCase(json);


  const logData = {
    method,
    url: endpoint,
    status: response.status,
    responseTime,
  };

  if (response.status < 200 || response.status >= 300) {
    if (json) {
      logData.error = json;
      throw new ServerAPIError(json);
    } else {
      logData.error = response.statusText;
      throw new Error(response.statusText);
    }
  }

  console.log('info', `API call: ${endpoint}`, logData);

  return json;
};

export const get = (endpoint, params) => {
  let url = endpoint;
  if (params) {
    url += `?${QueryString.stringify(CaseConverter.camelCaseToSnakeCase(params))}`;
  }
  return request(url, 'GET');
};

export const post = (endpoint, body, headers = {}) => (
  request(endpoint, 'POST', body, headers)
);

export const put = (endpoint, body) => (
  request(endpoint, 'PUT', body)
);

export const del = (endpoint, body) => (
  request(endpoint, 'DELETE', body)
);

export const upload = (file) => {
  const formData = new FormData();
  formData.append('file', file, file.name);
  return post('/uploads', formData, {
    'Content-Type': 'multipart/form-data',
  });
};

export default {
  get,
  post,
  put,
  del,
  upload,
};
