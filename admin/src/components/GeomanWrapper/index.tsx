import * as React from "react";
import { FeatureGroup } from "react-leaflet";
import type { FeatureCollection } from "geojson";
import * as L from "leaflet";
import { GeomanControls } from "react-leaflet-geoman-v2";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

interface Props {
  geojson: FeatureCollection;
  setGeojson: (geojson: FeatureCollection) => void;
}

export type ForwRefHandle = {
  setStyle: (options: L.PathOptions, index: number) => void;
  removeLayer: (index: number) => void;
  resetLayers: (data: FeatureCollection) => void;
};

const Geoman: React.ForwardRefRenderFunction<ForwRefHandle, Props> = (
  { geojson, setGeojson },
  forwrdedRef
) => {
  const ref = React.useRef<L.FeatureGroup>(null);

  React.useImperativeHandle(forwrdedRef, () => {
    return {
      setStyle(options, index) {
        const layers = ref.current?.getLayers();
        if (!layers) return;
        if (layers[index] instanceof L.Marker) return;
        const layerId = ref.current?.getLayerId(layers[index]);
        if (!layerId) return;
        const layer = ref.current?.getLayer(layerId) as L.FeatureGroup;
        layer.setStyle(options);
      },
      removeLayer(index) {
        const layers = ref.current?.getLayers();
        if (!layers) return;
        const layerId = ref.current?.getLayerId(layers[index]);
        if (!layerId) return;
        ref.current?.removeLayer(layerId);
      },
      resetLayers(data: FeatureCollection) {
        if (data) {
          ref.current?.clearLayers();
        }
      },
    };
  });

  React.useEffect(() => {
    if (ref.current?.getLayers().length === 0 && geojson) {
      L.geoJSON(geojson).eachLayer((layer) => {
        if (
          layer instanceof L.Polyline ||
          layer instanceof L.Polygon ||
          layer instanceof L.Marker
        ) {
          if (layer.feature?.properties?.style) {
            Object.assign(layer.options, layer.feature?.properties?.style);
          }
          if (layer?.feature?.properties.radius && ref.current) {
            if (layer?.feature?.properties.shape === "CircleMarker") {
              new L.CircleMarker(
                layer.feature.geometry.coordinates.slice().reverse(),
                {
                  radius: layer.feature?.properties.radius,
                  ...layer.feature?.properties?.style,
                }
              ).addTo(ref.current);
            } else {
              new L.Circle(
                layer.feature.geometry.coordinates.slice().reverse(),
                {
                  radius: layer.feature?.properties.radius,
                  ...layer.feature?.properties?.style,
                }
              ).addTo(ref.current);
            }
          } else {
            ref.current?.addLayer(layer);
          }
        }
      });
    }
  }, [JSON.stringify(geojson)]);

  const handleChange = () => {
    const newGeo: FeatureCollection = {
      type: "FeatureCollection",
      features: [],
    };
    const layers = ref.current?.getLayers();
    if (layers) {
      layers.forEach((layer) => {
        if (layer instanceof L.Circle || layer instanceof L.CircleMarker) {
          const shape = layer.pm.getShape();
          if (["Circle", "CircleMarker"].includes(shape)) {
            const { lat, lng } = layer.getLatLng();
            newGeo.features.push({
              type: "Feature",
              properties: {
                radius: layer.getRadius(),
                shape: layer.pm.getShape(),
                style: layer.options,
              },
              geometry: {
                type: "Point",
                coordinates: [lng, lat],
              },
            });
          }
        } else if (
          layer instanceof L.Marker ||
          layer instanceof L.Polygon ||
          layer instanceof L.Rectangle ||
          layer instanceof L.Polyline
        ) {
          newGeo.features.push({
            ...layer.toGeoJSON(),
            properties: {
              ...layer.toGeoJSON().properties,
              ...layer.options,
              shape: layer.pm.getShape(),
            },
          });
        }
      });
    }
    setGeojson(newGeo);
  };

  return (
    <FeatureGroup ref={ref}>
      <GeomanControls
        options={{
          position: "topleft",
          drawText: false,
          customControls: true,
        }}
        globalOptions={{
          continueDrawing: true,
          editable: false,
        }}
        // onMount={() => L.PM.setOptIn(true)}
        // onUnmount={() => L.PM.setOptIn(false)}
        eventDebugFn={console.log}
        onCreate={handleChange}
        onChange={handleChange}
        onUpdate={handleChange}
        onEdit={handleChange}
        onMapRemove={handleChange}
        onMapCut={handleChange}
        onDragEnd={handleChange}
        onMarkerDragEnd={handleChange}
      />
    </FeatureGroup>
  );
};

export default React.forwardRef(Geoman);
