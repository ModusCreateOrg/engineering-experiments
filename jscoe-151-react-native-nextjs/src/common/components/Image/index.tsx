import { FC } from 'react';
import { Image as RNImage, ImageProps } from 'react-native';

export const Image: FC<ImageProps> = ({ progressiveRenderingEnabled, ...props }) => {

  return (
    <RNImage {...props} progressiveRenderingEnabled />
  );
};
