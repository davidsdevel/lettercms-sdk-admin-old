const toQuery = require('./toQuery');
const fetch = require('isomorphic-unfetch');

async function createRequest(path, method, data) {
  if (!this.accessToken)
    throw new Error('Access Token is not Set');

  const hasNotMethod = typeof method === 'object' && !data;

  const dataParam = hasNotMethod ? method : data;
  const methodParam = hasNotMethod ? 'GET' : method;

  const isGet = methodParam === 'GET';

  let query = '';

  let headers = {
    Authorization: this.accessToken
  };

  let newData = {};

  if (isGet && !!dataParam) {
    if (Array.isArray(dataParam))
      newData = {
        fields: dataParam.join(',')
      };
    else {
      const dataObj = dataParam;

      if (dataObj.fields)
        newData.fields = dataObj.fields.join(',')
    }

    query = toQuery(newData);
  }

  if (!isGet)
    headers['Content-Type'] = 'application/json';

  try {
    const res = await fetch(`${path}${query}`, {
      method: methodParam,
      mode: 'cors',
      credentials: 'include',
      headers,
      body: !isGet && !!data ? JSON.stringify(data) : undefined
    });

    if (/json/.test(res.headers.get('content-type')))
      return res.json();

    return res.text();
  } catch(err) {
    return Promise.reject(err);
  }
}

module.exports = createRequest;
