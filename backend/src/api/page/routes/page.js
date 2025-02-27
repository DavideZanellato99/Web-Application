'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/pages',
      handler: 'page.find',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/page/:pageId',
      handler: 'page.findPageBySlug',
      config: {
        auth: false
      },
    },
  ],
};
