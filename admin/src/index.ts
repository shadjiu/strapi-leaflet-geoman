import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import getTrad from "./utils/getTrad";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import generateStyles from "./utils/generate-styles";

const name = pluginPkg.strapi.displayName;

export default {
  register(app: any) {
    app.createSettingSection(
      {
        id: `${pluginId}-label`,
        intlLabel: {
          id: getTrad("settings.section-label"),
          defaultMessage: name,
        },
      }, // Section to create
      [
        // links
        {
          intlLabel: {
            id: getTrad("settings.link-label"),
            defaultMessage: "Configuration",
          },
          id: `${pluginId}-link-label`,
          to: `/settings/${pluginId}`,
          Component: async () => {
            const component = await import(
              /* webpackChunkName: "settings-page" */ "./pages/Settings"
            );

            return component;
          },
          permissions: [
            { action: `plugin::${pluginId}.config`, subject: null },
          ],
        },
      ]
    );

    app.customFields.register({
      name: "geojson",
      pluginId, // the custom field is created by plugin
      type: "json", // the color will be stored as a json
      intlLabel: {
        id: getTrad("input.label"),
        defaultMessage: name,
      },
      intlDescription: {
        id: getTrad("input.description"),
        defaultMessage: "Draw/pick your location",
      },
      icon: PluginIcon, // don't forget to create/import your icon component
      // components: {
      //   Input: async () =>
      //     import(
      //       /* webpackChunkName: "input-component" */ "./components/Input"
      //     ),
      // },
      components: {
        Input: async () => import("./components/Input"),
      },
      options: {
        advanced: [
          {
            name: "optionsLatitude",
            type: "string",
            intlLabel: {
              id: getTrad("attribute.item.defaultLat"),
              defaultMessage: "Default latitude",
            },
          },
          {
            name: "optionsLongitude",
            type: "string",
            intlLabel: {
              id: getTrad("attribute.item.defaultLng"),
              defaultMessage: "Default longitude",
            },
          },
          {
            name: "optionsZoom",
            type: "number",
            intlLabel: {
              id: getTrad("attribute.item.defaultZoom"),
              defaultMessage: "Default Zoom Level",
            },
          },
          {
            name: "optionsTileURL",
            type: "string",
            intlLabel: {
              id: getTrad("attribute.item.defaultTileURL"),
              defaultMessage: "Tile URL",
            },
          },
          {
            name: "optionsTileAttribution",
            type: "string",
            intlLabel: {
              id: getTrad("attribute.item.defaultTileAttribution"),
              defaultMessage: "Tile Attribution",
            },
          },
          {
            name: "optionsTileAccessToken",
            type: "string",
            intlLabel: {
              id: getTrad("attribute.item.defaultTileAccessToken"),
              defaultMessage: "Tile Access Token",
            },
          },
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.requiredField",
                  defaultMessage: "Required field",
                },
                description: {
                  id: "form.attribute.item.requiredField.description",
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {
    generateStyles();
  },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
