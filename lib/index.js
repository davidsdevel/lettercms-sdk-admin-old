const createRequest = require('./createRequest');
const {login, getPages, api} = require('./fbUtils');

const isDev = process.env.NODE_ENV !== 'production';

const devEndpoint = 'http://localhost:3009';

const stagingEndpoint = 'https://lettercms-api-staging.herokuapp.com';

const accountEndpoint = isDev ? devEndpoint : stagingEndpoint;//'https://davidsdevel-accounts.lettercms.vercel.app';
const socialEndpoint = isDev ? devEndpoint : stagingEndpoint;//'https://davidsdevel-socials.lettercms.vercel.app';
const blogEndpoint = isDev ? devEndpoint : stagingEndpoint;//'https://davidsdevel-blogs.lettercms.vercel.app';
const statEndpoint = isDev ? devEndpoint : stagingEndpoint;//'https://davidsdevel-stats.lettercms.vercel.app';

const request = createRequest.bind({
  accessToken: process.env.LETTER_ACCESS_TOKEN
});


module.exports = {
  login: (email, password) => request(`${accountEndpoint}/api/account/login`, 'POST', {
    email,
    password,
    _includeFirebase: true
  }),
  createAccount: data => request(`${accountEndpoint}/api/account`, 'POST', data),
  createCollaborator: data => request(`${accountEndpoint}/api/collaborator`, 'POST', data),
  /* TODO: Update verification method
  verifyAccount: (email, code) => request(`${accountEndpoint}/api/account/verify`, 'POST', {
    code,
    email
  }),*/
  createBlog: data => request(`${blogEndpoint}/api/blog`, 'POST', data),
  facebookLogin: scope => login(scope.join(',')),
  facebookPages: async fields => {
    try {
      const {data} = await getPages({fields: fields.join(',')});

      return Promise.resolve(data);
    } catch(err) {
      throw err;
    }
  },
  setFacebookPage: (pageID, accessToken, subdomain)  => request(`${socialEndpoint}/api/social/account`, 'POST', {
    type: 'facebook',
    pageID,
    accessToken,
    subdomain
  }),
  setInstagramPage: (pageID, accessToken, subdomain)  => request(`${socialEndpoint}/api/social/account`, 'POST', {
    type: 'instagram',
    pageID,
    accessToken,
    subdomain
  })
}
