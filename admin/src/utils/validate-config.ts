const validateConfig = (config: any) => {
  const latitude = parseFloat(config.latitude);
  const longitude = parseFloat(config.longitude);
  const zoom = parseInt(config.zoom);
  const tileUrl = config.tileUrl?.trim?.();
  const tileAttribution = config.tileAttribution?.trim?.();
  const tileAccessToken = config.tileAccessToken?.trim?.();

  return {
    latitude: !isNaN(latitude) ? latitude : undefined,
    longitude: !isNaN(longitude) ? longitude : undefined,
    zoom: !isNaN(zoom) ? zoom : undefined,
    tileUrl,
    tileAttribution,
    tileAccessToken,
  };
};

export default validateConfig;
