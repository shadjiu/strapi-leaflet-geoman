import { Strapi } from "@strapi/strapi";
import { Config } from "../../../types";
import * as pckg from "../../../package.json";

const uid = `plugin::${pckg.strapi.name}.config`;
const fields = [
  "defaultLatitude",
  "defaultLongitude",
  "defaultZoom",
  "defaultTileURL",
  "defaultTileAttribution",
  "defaultTileAccessToken",
];

export default ({ strapi }: { strapi: Strapi }) => ({
  async retrieve(): Promise<Config | null> {
    let config: Config | null;

    if (strapi.entityService) {
      /* Find existing config */
      config = (await strapi.entityService.findMany(uid as never, {
        fields,
      })) as unknown as Config;

      /* Create config if not found */
      if (!config) {
        config = (await strapi.entityService.create(uid as never, {
          fields,
          data: {},
        })) as Config;
      }

      return config;
    }

    return null;
  },

  async update(data: any): Promise<Config> {
    /* Retrieve config */
    let config: Config = await this.retrieve();

    /* Update config */
    if (strapi.entityService) {
      config = (await strapi.entityService.update(uid as never, config.id, {
        ...data,
        fields,
      })) as Config;

      return config;
    }

    return config;
  },
});
