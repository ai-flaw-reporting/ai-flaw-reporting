export default {
  routes: [
    {
      method: "GET",
      path: "/flare/submissions",
      handler: "submissions.find",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
