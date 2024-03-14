import { Strapi } from "@strapi/strapi";
import { sanitizeConfigInput } from "../content-types/config";
import { Config } from "../../types";

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx: any) {
    const config: Config = await strapi
      .plugin("leaflet-maps")
      .service("config")
      .retrieve();

    ctx.body = {
      data: config,
    };
  },

  async update(ctx: any) {
    const data: Config = await sanitizeConfigInput(ctx.request.body, ctx);

    const config: Config = await strapi
      .plugin("leaflet-maps")
      .service("config")
      .update(data);

    ctx.body = {
      data: config,
    };
  },
});
