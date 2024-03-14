import { valid } from "geojson-validation";

export const validateGeoJSON = (geoJSON: string) => {
  try {
    geoJSON = geoJSON.trim();
    const geoJSONObject = JSON.parse(geoJSON);
    const isValid = valid(geoJSONObject);

    if (isValid) {
      return geoJSONObject;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default validateGeoJSON;
