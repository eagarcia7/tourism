// File to create/modify: ./config/plugins.js
module.exports = ({ env }) => ({
    graphql: {
      enabled: true,
      config: {
        landingPage: true, // Replaces deprecated playgroundAlways
        defaultLimit: 10,
        maxLimit: 100,
        apolloServer: {
          tracing: false,
        },
      },
    },
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET'),
      },
    },
  });