// @ts-ignore
import { Button } from "@strapi/design-system";
import { Download as ExportIcon } from "@strapi/icons";
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
        Export file
      </Button>
    </>
  );
};

export default ExportGeoJSON;
