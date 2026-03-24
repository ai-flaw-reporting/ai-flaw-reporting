export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'global::rate-limit',
    config: {
      maxRequests: 50,
    },
  },
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
