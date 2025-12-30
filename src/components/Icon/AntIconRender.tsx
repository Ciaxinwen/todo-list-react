/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as icons from "@ant-design/icons";

export type IconName = keyof typeof icons;

export const AntIconRender = ({
  name,
  ...props
}: {
  name: IconName;
  style?: React.CSSProperties;
}) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return React.createElement(IconComponent as any, props);
};
