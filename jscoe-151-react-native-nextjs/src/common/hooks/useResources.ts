import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

import HindRegular from '../../../assets/fonts/Hind-Regular.ttf';
import HindMedium from '../../../assets/fonts/Hind-Medium.ttf';
import HindBold from '../../../assets/fonts/Hind-Bold.ttf';
import LoraItalic from '../../../assets/fonts/Lora-Italic.ttf';
import OutfitRegular from '../../../assets/fonts/Outfit-Regular.ttf';
import OutfitMedium from '../../../assets/fonts/Outfit-Medium.ttf';
import OutfitBold from '../../../assets/fonts/Outfit-Bold.ttf';

export const useResources = () => {
  const [isFontLoading, setFontLoading] = useState(false);

  const loadFontAsync = async () => {
    try {
      await Font.loadAsync({
        HindRegular: {
          uri: HindRegular as any,
          display: Font.FontDisplay.SWAP,
        },
        HindMedium: {
          uri: HindMedium as any,
          display: Font.FontDisplay.SWAP,
        },
        HindBold: {
          uri: HindBold as any,
          display: Font.FontDisplay.SWAP
        },
        LoraItalic: {
          uri: LoraItalic as any,
          display: Font.FontDisplay.SWAP
        },
        OutfitRegular: {
          uri: OutfitRegular as any,
          display: Font.FontDisplay.SWAP
        },
        OutfitMedium: {
          uri: OutfitMedium as any,
          display: Font.FontDisplay.SWAP
        },
        OutfitBold: {
          uri: OutfitBold as any,
          display: Font.FontDisplay.SWAP
        },
      });
    } catch (error) {
      console.log('Font Load Error:', error)
    } finally {
      setFontLoading(true);
    }
  }

  useEffect(() => {
    loadFontAsync();
  }, []);

  return {
    isFontLoading
  }
};
