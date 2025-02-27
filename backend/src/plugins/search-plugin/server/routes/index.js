module.exports = [
  {
    method: 'GET',
    path: '/search',
    handler: 'myController.search',
    config: {
      auth: false,
      policies: [],
    },
  },
];
