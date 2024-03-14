const isValidConfig = (config: any) => {
  if (
    typeof config.longitute === "number" &&
    typeof config.latitude === "number" &&
    typeof config.zoom === "number"
  ) {
    return true;
  }

  return false;
};

export default isValidConfig;
