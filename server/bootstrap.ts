import { Strapi } from "@strapi/strapi";

const accessActions = [
  {
    section: "plugins",
    displayName: "View / Edit Configuration",
    uid: "config",
    pluginName: "leaflet-maps",
  },
];

export default async ({ strapi }: { strapi: Strapi }) => {
  // bootstrap phase
  if (strapi.admin) {
    await strapi.admin.services.permission.actionProvider.registerMany(
      accessActions
    );
  }
};
