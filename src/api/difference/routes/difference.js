module.exports = {
  routes: [
     {
        method: 'GET',
        path: '/difference',
        handler: 'difference.exampleAction',
        config: {
          policies: [],
          middlewares: [],
      },
    },
  ],
};
