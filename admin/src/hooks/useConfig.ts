import { useEffect, useState } from "react";
import { Config, UpdateConfig } from "../../../types";
import axios from "../utils/axios";
import { AxiosResponse } from "axios";

const endpoint = "/config";

export default function useConfig(newConfig?: UpdateConfig) {
  const [config, setConfig] = useState<Config | undefined | null>();

  const onResponse = ({ data }: AxiosResponse) => setConfig(data.data);

  const onError = (error: Error) => {
    console.error(error);
    setConfig(null);
  };

  useEffect(() => {
    axios.get(endpoint).then(onResponse).catch(onError);
  }, []);

  useEffect(() => {
    if (newConfig) {
      setConfig(undefined);

      axios.put(endpoint, { data: newConfig }).then(onResponse).catch(onError);
    }
  }, [newConfig]);

  return config;
}
