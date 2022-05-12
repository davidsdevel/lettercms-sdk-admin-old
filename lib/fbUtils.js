function login(scope) {
  return new Promise((resolve, reject) => window.FB.login(resolve, {scope}));
}

function getLoginStatus() {
  return new Promise((resolve, reject) => window.FB.getLoginStatus(resolve));
}

function getPages(options) {
  return new Promise((resolve, reject) => window.FB.api('/me/accounts', resolve, options));
}

function api(url, options) {
  return new Promise(resolve => window.FB.api(url, resolve, options));
}

module.exports = {
  login,
  getLoginStatus,
  getPages,
  api
}
