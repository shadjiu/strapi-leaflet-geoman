import * as L from "leaflet";

const createCustomIcon = (latlng: L.LatLng, url: string) => {
  let myIcon = L.icon({
    iconUrl: url,
    // shadowUrl: url,
    iconSize: [25, 25], // width and height of the image in pixels
    // shadowSize: [35, 20], // width, height of optional shadow image
    iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
  });
  return L.marker(latlng, { icon: myIcon });
};

export const setMarkerIcon = (url: string) => {
  return L.icon({
    iconUrl: url,
    // shadowUrl: url,
    iconSize: [25, 25], // width and height of the image in pixels
    // shadowSize: [35, 20], // width, height of optional shadow image
    iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
  });
};

export default createCustomIcon;
