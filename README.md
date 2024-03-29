# Strapi-Leaflet-Geoman

<p align="center">
  <img src="https://raw.githubusercontent.com/shadjiu/strapi-leaflet-geoman/main/pictures/logo.svg" alt="Meilisearch-Strapi" width="300" height="300" />
</p>

A Strapi plugin allowing you to implement a Leaflet-Geoman custom field into your content-types, which can be used to pick and retrieve locations.

## ✨ Usage

The API response of a Strapi content-type implementing this leaflet-geoman custom field could look as follows:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point | Polygon | MultiLineString | LineString",
          "coordinates": [-104.99404, 39.75621]
      },
      "properties": {
      	"style": {
          "color": "#059669",
          "weight": 8
        },
      }
    }
  ]
}
```

You can configure globally this plugin inside your Strapi dashboard's settings tab (e.g. to enter leaflet tile url, attribution etc.).

![Preview](https://github.com/shadjiu/strapi-leaflet-geoman/blob/main/pictures/global-configuration.gif?raw=true)

Also plugin can be configured per collection entity.

![Preview](https://github.com/shadjiu/strapi-leaflet-geoman/blob/main/pictures/entity-configuration.gif?raw=true)

Now you can use Strapi Leaflet Geoman as a custom field.

![Preview](https://github.com/shadjiu/strapi-leaflet-geoman/blob/main/pictures/result.gif?raw=true)

## ❗ Requirements

- Strapi v4
- To customize leaflet tiles, visit and choose one from [Leaflet Providers](https://leaflet-extras.github.io/leaflet-providers/preview/).

## 🔧 Installation

You just need to install the `strapi-leaflet-geoman` package via npm, at the root of your strapi project.

**npm:**

```bash
npm i strapi-leaflet-geoman
```


**yarn:**

```bash
yarn add strapi-leaflet-geoman
```


**To make Strapi Leaflet Geoman work, you should take a look at the next section.**

After restarting your Strapi app, Strapi Leaflet Geoman should be listed as one of your plugins.

## 🚀 Strapi Configuration (required)

Allow all Google Maps assets to be loaded correctly by customizing the **strapi::security** middleware inside `./config/middlewares.js`.

Instead of:

```js
export default [
  // ...
  'strapi::security',
  // ...
];
```

Write:

```js
export default [
  // ...
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "script-src": [
            "'self'",
            "unsafe-inline",
            "https://*.basemaps.cartocdn.com",
          ],
          "media-src": [
            "'self'",
            "blob:",
            "data:",
            "https://*.basemaps.cartocdn.com",
            "https://tile.openstreetmap.org",
          ],
          "img-src": [
            "'self'",
            "blob:",
            "data:",
            "https://*.basemaps.cartocdn.com",
            "market-assets.strapi.io",
            "https://tile.openstreetmap.org",
          ],
        },
      },
    },
  },
  // ...
];
```
