import { FC } from "react";
import { View } from "react-native";

type Height = {
  height?: number;
};

type Width = {
  width?: number;
};

export const Spacer: FC<Height | Width> = (props) => {
  if ('width' in props) {
    return <View style={{ width: props.width }} />;
  };

  if ('height' in props) {
    return <View style={{ height: props.height }} />;
  };

  return <></>;
};
