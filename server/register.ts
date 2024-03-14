import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "geojson",
    plugin: "leaflet-maps",
    type: "json",
  });
};
