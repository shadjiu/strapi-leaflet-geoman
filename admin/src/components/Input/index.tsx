import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import type { FeatureCollection, Feature } from "geojson";
import GeomanWrapper, { ForwRefHandle } from "../GeomanWrapper";
import { useIntl } from "react-intl";
import { Box, Typography } from "@strapi/design-system";
import { ItemInterface } from "react-sortablejs";
import { ColorResult, FileType } from "../../../../types";
import _, { isEqual } from "lodash";
import MapItems from "../MapItems";
import useConfig from "../../hooks/useConfig";
import { Loader } from "@strapi/icons";
import isValidConfig from "../../utils/validate-config";
import ModalWrapper from "../ModalWrapper";

const Input = (props: any) => {
  const config = useConfig();

  useEffect(() => {
    const parsedValue: FeatureCollection | null = !!props.value
      ? JSON.parse(props.value)
      : null;

    if (!parsedValue) return;

    setGeojson(parsedValue);
  }, [props.value]);

  const geomanRef = useRef<ForwRefHandle>(null);

  const [geojson, setGeojson] = React.useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });
  const { formatMessage } = useIntl();

  const {
    optionsLatitude,
    optionsLongitude,
    optionsZoom,
    optionsTileURL,
    optionsTileAttribution,
    optionsTileAccessToken,
  } = props.attribute;

  const individualConfig = {
    latitude: optionsLatitude,
    longitude: optionsLongitude,
    zoom: optionsZoom,
    tileUrl: optionsTileURL,
    tileAttribution: optionsTileAttribution,
    tileAccessToken: optionsTileAccessToken,
  };

  const globalConfig = config
    ? {
        latitude: config.defaultLatitude,
        longitude: config.defaultLongitude,
        zoom: config.defaultZoom,
        tileUrl: config.defaultTileURL,
        tileAttribution: config.defaultTileAttribution,
        tileAccessToken: config.defaultTileAccessToken,
      }
    : {};

  const mapProps = isValidConfig(individualConfig)
    ? {
        zoom: individualConfig.zoom,
        center: [individualConfig.latitude, individualConfig.longitude] as [
          number,
          number
        ],
        tileUrl: individualConfig.tileUrl,
        tileAttribution: individualConfig.tileAttribution,
        tileAccessToken: individualConfig.tileAccessToken,
      }
    : {
        zoom: globalConfig.zoom,
        center: [globalConfig.latitude, globalConfig.longitude] as [
          number,
          number
        ],
        tileUrl: globalConfig.tileUrl,
        tileAttribution: globalConfig.tileAttribution,
        tileAccessToken: globalConfig.tileAccessToken,
      };

  const handleFeaturesChange = (features: FeatureCollection) => {
    setGeojson(features);

    props.onChange({
      target: {
        name: props.name,
        value: JSON.stringify(features),
        type: props.attribute.type,
      },
    });
  };

  const handleColorChange = (color: ColorResult, feature: Feature) => {
    const featureIndex = geojson.features.findIndex((ft) =>
      isEqual(ft.geometry, feature.geometry)
    );

    if (featureIndex >= 0) {
      const geo = _.cloneDeep(geojson);
      geo.features.splice(featureIndex, 1, {
        ...feature,
        properties: {
          ...feature.properties,
          style: {
            ...feature?.properties?.style,
            color: color.hex,
          },
        },
      });

      handleFeaturesChange(geo);

      geomanRef.current?.setStyle({ color: color.hex }, featureIndex);
    }
  };

  const handleWeightChange = (weight: number, feature: Feature) => {
    const featureIndex = geojson.features.findIndex((ft) =>
      isEqual(ft, feature)
    );

    if (featureIndex >= 0) {
      const geo = _.cloneDeep(geojson);
      geo.features.splice(featureIndex, 1, {
        ...feature,
        properties: {
          ...feature.properties,
          style: {
            ...feature?.properties?.style,
            weight,
          },
        },
      });
      geomanRef.current?.setStyle({ weight }, featureIndex);
      handleFeaturesChange(geo);
    }
  };

  const handleFeatureRemove = (feature: Feature) => {
    const newGeoJSON: FeatureCollection = {
      type: "FeatureCollection",
      features: geojson.features.filter((item) => !isEqual(item, feature)),
    };

    const featureIndex = geojson.features.findIndex((ft) =>
      isEqual(ft, feature)
    );

    if (featureIndex >= 0) {
      geomanRef.current?.removeLayer(featureIndex);
    }

    handleFeaturesChange(newGeoJSON);
  };

  const onFileUpload = (data: FileType) => {
    const geoJSONObj = {
      ...geojson,
      features: [...geojson.features, ...data.geoJSON.features],
    };

    geomanRef.current?.resetLayers(geoJSONObj);
    handleFeaturesChange(geoJSONObj);
  };

  const setList = (newState: ItemInterface[]) => {
    const newGeoJSON: FeatureCollection = {
      type: "FeatureCollection",
      features: newState as Feature[],
    };

    geomanRef.current?.resetLayers(newGeoJSON);
    setGeojson(newGeoJSON);
  };

  return (
    <>
      <Typography variant="pi" fontWeight="bold">
        {formatMessage(props.intlLabel)}
      </Typography>

      {!config && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader small />
        </div>
      )}

      {!!config && (
        <ModalWrapper>
          <Box style={{ display: "flex", height: "90vh" }}>
            <Box style={{ width: "calc(100% - 320px)" }}>
              <MapContainer zoom={mapProps.zoom} center={mapProps.center}>
                <TileLayer
                  attribution={mapProps.tileAttribution}
                  url={mapProps.tileUrl}
                  accessToken={mapProps.tileAccessToken}
                />
                <GeomanWrapper
                  ref={geomanRef}
                  geojson={geojson}
                  setGeojson={handleFeaturesChange}
                />
              </MapContainer>
            </Box>
            <MapItems
              geojson={geojson}
              setList={setList}
              handleWeightChange={handleWeightChange}
              handleFeatureRemove={handleFeatureRemove}
              handleColorChange={handleColorChange}
              onFeaturesUpload={onFileUpload}
            />
          </Box>
        </ModalWrapper>
      )}
    </>
  );
};

export default Input;
