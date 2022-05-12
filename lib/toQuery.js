module.exports = data => `?${Object.entries(data).map((e) => `${e[0]}=${e[1]}`).join('&')}`;
