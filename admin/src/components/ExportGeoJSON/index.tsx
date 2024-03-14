import { Button, Box } from "@strapi/design-system";
import ExportIcon from "@strapi/icons/Download";
import exportGeoJSON from "../../utils/export-geo";

const ExportGeoJSON = ({ data, name }: { data: JSON; name: string }) => {
  const handleClick = () => {
    exportGeoJSON(data, name);
  };

  return (
    <>
      <br />
      <Button
        style={{ width: "100%" }}
        onClick={handleClick}
        startIcon={<ExportIcon />}
      >
        Export {name}.json
      </Button>
    </>
  );
};

export default ExportGeoJSON;
