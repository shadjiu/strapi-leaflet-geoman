/**
 *
 * PluginIcon
 *
 */

import React from "react";
import styled from "styled-components";
import { PinMap } from "@strapi/icons";

const StyledPinMap = styled(PinMap)`
  path {
    fill: ${({ theme }) => theme.colors.primary500};
  }
`;

const PluginIcon = () => <StyledPinMap />;

export default PluginIcon;
