import { useState, useEffect } from "react";
import pluginId from "../../pluginId";
import {
  Main,
  ContentLayout,
  HeaderLayout,
  Layout,
  Loader,
  TextInput,
  Box,
  Button,
  // @ts-ignore
} from "@strapi/design-system";
import { Check } from "@strapi/icons";
import useConfig from "../../hooks/useConfig";
import { AnErrorOccurred } from "@strapi/helper-plugin";
import { Config, UpdateConfig } from "../../../../types";

export default function Settings() {
  const [saveConfig, setSaveConfig] = useState<UpdateConfig | undefined>();

  const [inputFields, setInputFields] = useState<UpdateConfig | undefined>();

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const config = useConfig(saveConfig);

  useEffect(() => {
    if (!!config) {
      setInputFields(config);
    }
  }, [config]);

  useEffect(() => {
    if (!inputFields || !config) return;

    const inputFieldChanged = Object.entries(inputFields).some(
      ([key, value]) => value !== config[key as keyof Config]
    );

    setUnsavedChanges(inputFieldChanged);
  }, [inputFields]);

  const onSave = () => {
    setUnsavedChanges(false);

    setSaveConfig(inputFields);
  };

  return (
    <Box background="neutral100">
      <Layout>
        <Main aria-busy={config === undefined}>
          <HeaderLayout
            primaryAction={
              <Button
                startIcon={<Check />}
                loading={config === undefined}
                disabled={!unsavedChanges}
                onClick={onSave}
              >
                Save
              </Button>
            }
            title="Leaflet Maps Configuration"
            subtitle="Configure your Leaflet Maps settings"
          />

          <ContentLayout>
            {config === null ? (
              <AnErrorOccurred
                content={{
                  id: `${pluginId}.error`,
                  defaultMessage: "An error occurred",
                }}
              />
            ) : config === undefined || !inputFields ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Loader />
              </div>
            ) : (
              <Box
                style={{
                  gap: "16px",
                  display: "flex",
                  flexDirection: "column",
                }}
                shadow="tableShadow"
                background="neutral0"
                paddingTop={6}
                paddingLeft={7}
                paddingRight={7}
                paddingBottom={6}
                hasRadius
              >
                <TextInput
                  type="number"
                  id="latitude"
                  name="latitude"
                  placeholder="Add default map center latitude"
                  label="Default Map Latitude"
                  value={inputFields.defaultLatitude}
                  onChange={(e: any) => {
                    setInputFields({
                      ...inputFields,
                      defaultLatitude: e.target.value,
                    });
                  }}
                />

                <TextInput
                  type="number"
                  id="longitude"
                  name="longitude"
                  placeholder="Add default map center longitude"
                  label="Default Map Longitude"
                  value={inputFields.defaultLongitude}
                  onChange={(e: any) => {
                    setInputFields({
                      ...inputFields,
                      defaultLongitude: e.target.value,
                    });
                  }}
                />

                <TextInput
                  type="number"
                  id="zoom"
                  name="zoom"
                  placeholder="Add default map zoom level"
                  label="Default Map Zoom Level"
                  value={inputFields.defaultZoom}
                  onChange={(e: any) => {
                    setInputFields({
                      ...inputFields,
                      defaultZoom: e.target.value,
                    });
                  }}
                />

                <TextInput
                  type="text"
                  id="tileURL"
                  name="tileURL"
                  placeholder="Add default map tile URL"
                  label="Default Map Tile URL"
                  value={inputFields.defaultTileURL}
                  onChange={(e: any) => {
                    setInputFields({
                      ...inputFields,
                      defaultTileURL: e.target.value,
                    });
                  }}
                />

                <TextInput
                  type="text"
                  id="tileAttribution"
                  name="tileAttribution"
                  placeholder="Add default map tile Attribution"
                  label="Default Map Tile Attribution"
                  value={inputFields.defaultTileAttribution}
                  onChange={(e: any) => {
                    setInputFields({
                      ...inputFields,
                      defaultTileAttribution: e.target.value,
                    });
                  }}
                />

                <TextInput
                  type="text"
                  id="accessToken"
                  name="accessToken"
                  placeholder="Add default map tile Access Token"
                  label="Default Map Tile Access Token"
                  value={inputFields.defaultTileAccessToken}
                  onChange={(e: any) => {
                    setInputFields({
                      ...inputFields,
                      defaultTileAccessToken: e.target.value,
                    });
                  }}
                />
              </Box>
            )}
          </ContentLayout>
        </Main>
      </Layout>
    </Box>
  );
}
