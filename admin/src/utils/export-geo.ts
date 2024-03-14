const exportGeoJSON = (data: JSON, name?: string) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = name ? `${name}.json` : "@sh/geojson.json";

  link.click();
};

export default exportGeoJSON;
