import React, { useRef, useState } from "react";
// @ts-ignore
import { Button } from "@strapi/design-system";
import { Upload as UploadIcon } from "@strapi/icons";
import validateGeoJSON from "../../utils/validate-geo";
import { FileType } from "../../../../types";

const UploadGeoJSON = ({
  onUpload,
}: {
  onUpload?: (data: FileType) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileType>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      let name = e.target.files[0].name;

      fileReader.onload = (event) => {
        if (event.target?.result) {
          const geoJson = validateGeoJSON(event.target.result.toString());
          if (geoJson) {
            setFiles({ name, geoJSON: geoJson });
            onUpload?.({ name, geoJSON: geoJson });
          }
        }
      };
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ visibility: "hidden", height: 0 }}
      />
      <Button
        style={{ width: "100%" }}
        onClick={handleClick}
        startIcon={<UploadIcon />}
      >
        {files ? files.name : "Upload GeoJSON..."}
      </Button>
      <br />
    </>
  );
};

export default UploadGeoJSON;
