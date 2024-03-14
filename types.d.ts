import { FeatureCollection } from "geojson";

/**
 * The plugin's configuration content-type.
 */
export interface Config {
  id: number;
  defaultLatitude: number;
  defaultLongitude: number;
  defaultZoom: number;
  defaultTileURL: string;
  defaultTileAttribution: number;
  defaultTileAccessToken: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UpdateConfig extends Omit<Config, "id"> {}

export type ColorResult = {
  rgb: RgbColor;
  hsl: HslColor;
  hsv: HsvColor;
  rgba: RgbaColor;
  hsla: HslaColor;
  hsva: HsvaColor;
  hex: string;
  hexa: string;
};
export interface HsvColor {
  h: number;
  s: number;
  v: number;
}
export interface HsvaColor extends HsvColor {
  a: number;
}
export interface RgbColor {
  r: number;
  g: number;
  b: number;
}
export interface RgbaColor extends RgbColor {
  a: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}
export interface HslaColor extends HslColor {
  a: number;
}

export type FileType = {
  name: string;
  geoJSON: FeatureCollection;
};
