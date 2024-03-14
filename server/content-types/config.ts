import * as utils from "@strapi/utils";
import { Config } from "../../types";
import { Model } from "@strapi/utils/dist/types";

const { sanitize } = utils;
const { contentAPI } = sanitize;

const schema: Model = {
  // uid: "leaflet-maps",
  kind: "singleType",
  modelType: "contentType",
  // @ts-ignore
  collectionName: "leaflet_maps_configs",
  info: {
    singularName: "config",
    pluralName: "configs",
    displayName: "Leaflet Maps Config",
  },
  options: {
    populateCreatorFields: false,
    draftAndPublish: false,
  },
  pluginOptions: {
    "content-manager": {
      visible: false,
    },
    "content-type-builder": {
      visible: false,
    },
  },
  attributes: {
    defaultLatitude: {
      type: "decimal",
      required: true,
      default: 42,
      configurable: false,
    },
    defaultLongitude: {
      type: "decimal",
      default: 42,
      required: true,
      configurable: false,
    },
    defaultZoom: {
      type: "integer",
      default: 6,
      required: true,
      configurable: false,
    },
    defaultTileURL: {
      type: "string",
      required: true,
      default: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      configurable: false,
    },
    defaultTileAttribution: {
      type: "string",
      required: true,
      default:
        "Map data © <a href='https://www.openstreetmap.org'>OpenStreetMap</a> contributors",
      configurable: false,
    },
    defaultTileAccessToken: {
      type: "string",
      required: false,
      default: "",
      configurable: false,
    },
  },
};

export default schema;

export function sanitizeConfigInput(data: object, ctx: any): Promise<Config> {
  return contentAPI.input(data, schema, ctx.state.auth) as Promise<Config>;
}
