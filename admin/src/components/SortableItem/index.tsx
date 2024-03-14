import { useRef, useState } from "react";
import type { Feature } from "geojson";
import Chrome from "@uiw/react-color-chrome";
import {
  Popover,
  Button,
  Flex,
  IconButton,
  Typography,
} from "@strapi/design-system";
import { ColorResult } from "../../../../types";
import DragIcon from "@strapi/icons/Drag";
import DeleteIcon from "@strapi/icons/Trash";
import ListIcon from "@strapi/icons/List";
import StripeSlider from "../Slider";

const SortableItem = ({
  feature,
  handleChange,
  handleRemove,
  handleWeightChange,
}: {
  feature: Feature;
  handleRemove: (feature: Feature) => void;
  handleChange: (color: ColorResult, feature: Feature) => void;
  handleWeightChange: (weight: number, feature: Feature) => void;
}) => {
  const [visibleColor, setVisibleColor] = useState(false);
  const [visibleWeight, setVisibeWeight] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null!);
  const weightBtnRef = useRef<HTMLButtonElement>(null!);

  const handleColorChange = (color: ColorResult) => {
    handleChange(color, feature);
  };

  return (
    <Flex
      style={{
        border: "1px solid #6666",
        borderRadius: "4px",
        backgroundColor: "transparent",
      }}
    >
      <IconButton noBorder icon={<DragIcon />} />
      {!["Marker"].includes(feature?.properties?.shape) && (
        <Button
          ref={buttonRef}
          onClick={() => setVisibleColor((s) => !s)}
          noBorder
          style={{
            border: "1px solid #6666",
            borderRadius: "50%",
            padding: "8px",
            width: "22px",
            height: "22px",
            backgroundColor: feature.properties?.style?.color || "#3388FF",
          }}
        />
      )}

      {!["Marker"].includes(feature?.properties?.shape) && (
        <IconButton
          onClick={() => setVisibeWeight((s) => !s)}
          ref={weightBtnRef}
          noBorder
          icon={<ListIcon />}
        />
      )}

      <Typography style={{ margin: "0 4px", fontSize: "12px" }}>
        {feature.geometry.type}{" "}
        {((feature.geometry as any).coordinates || []).length} points
      </Typography>
      <IconButton
        noBorder
        icon={<DeleteIcon />}
        style={{ marginLeft: "auto" }}
        onClick={() => handleRemove(feature)}
      />
      {visibleColor && (
        <Popover
          centered
          source={buttonRef}
          spacing={16}
          onDismiss={() => setVisibleColor(false)}
        >
          <Chrome
            color={feature.properties?.style?.color || "#3388FF"}
            onChange={handleColorChange}
          />
        </Popover>
      )}

      {visibleWeight && (
        <Popover
          centered
          source={weightBtnRef}
          onDismiss={() => setVisibeWeight(false)}
          style={{ width: "200px", padding: "16px" }}
        >
          <Flex gap="12px">
            <Typography>
              Width ({feature.properties?.style?.weight || 1}):{" "}
            </Typography>
            <StripeSlider
              min={0.1}
              max={10}
              step={0.1}
              defaultValue={feature.properties?.style?.weight || 1}
              onChangeComplete={(nr) =>
                handleWeightChange(nr as number, feature)
              }
            />
          </Flex>
        </Popover>
      )}
    </Flex>
  );
};

export default SortableItem;
