import type { FeatureCollection, Feature } from "geojson";
import { Box, Typography } from "@strapi/design-system";
import SortableItem from "../SortableItem";
import {
  ItemInterface,
  ReactSortable,
  Sortable,
  Store,
} from "react-sortablejs";
import UploadGeoJSON from "../UploadGeoJSON";
import ExportGeoJSON from "../ExportGeoJSON";
import { ColorResult, FileType } from "../../../../types";

type MapItemsProps = {
  setList:
  | ((
    newState: ItemInterface[],
    sortable: Sortable | null,
    store: Store
  ) => void)
  | undefined;
  geojson: FeatureCollection;
  handleWeightChange: (weight: number, feature: Feature) => void;
  handleFeatureRemove: (feature: Feature) => void;
  handleColorChange: (color: ColorResult, feature: Feature) => void;
  onFeaturesUpload: (data: FileType) => void;
};

const MapItems = ({
  setList,
  geojson,
  handleWeightChange,
  handleFeatureRemove,
  handleColorChange,
  onFeaturesUpload,
}: MapItemsProps) => {
  return (
    <Box
      style={{
        width: "320px",
        overflow: "auto",
        padding: "0 20px",
        position: "relative",
      }}
    >
      <Typography variant="pi" fontWeight="bold">
        {geojson.features.length} Features
      </Typography>
      <UploadGeoJSON onUpload={onFeaturesUpload} />
      <ReactSortable
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: "8px",
          maxHeight: "500px",
          overflowX: 'hidden',
          overflowY: "auto",
          height: "100%",
        }}
        list={geojson.features as ItemInterface[]}
        setList={setList}
      >
        {geojson.features.map((feature, i) => (
          <SortableItem
            key={i}
            feature={feature}
            handleWeightChange={handleWeightChange}
            handleRemove={handleFeatureRemove}
            handleChange={handleColorChange}
          />
        ))}
      </ReactSortable>

      <ExportGeoJSON data={geojson as unknown as JSON} name="" />
    </Box>
  );
};

export default MapItems;
