import * as pckg from "../../../package.json";

export default [
  {
    method: "GET",
    path: "/config",
    handler: "config.index",
    config: {
      policies: ["admin::isAuthenticatedAdmin"],
    },
  },
  {
    method: "PUT",
    path: "/config",
    handler: "config.update",
    config: {
      policies: [
        "admin::isAuthenticatedAdmin",
        {
          name: "admin::hasPermissions",
          config: {
            actions: [`plugin::${pckg.strapi.name}.config`],
          },
        },
      ],
    },
  },
];
