import { Theme } from './';
import { darkColors, lightColors } from './colors';

const neutral = {
  0: lightColors.neutral0,
  10: lightColors.neutral10,
  20: lightColors.neutral20,
  30: lightColors.neutral30,
  40: lightColors.neutral40,
  50: lightColors.neutral50,
  60: lightColors.neutral60,
  70: lightColors.neutral70,
  80: lightColors.neutral80,
  90: lightColors.neutral90,
  100: lightColors.neutral100
};

export const lightTheme: Theme = {
  variant: 'light',
  color: {
    neutral,
    primary: {
      0: lightColors.primary0,
      10: lightColors.primary10,
      20: lightColors.primary20,
      30: lightColors.primary30,
      40: lightColors.primary40,
      50: lightColors.primary50,
      60: lightColors.primary60,
      70: lightColors.primary70,
      80: lightColors.primary80,
      90: lightColors.primary90,
      100: lightColors.primary100
    }
  }
};

export const darkTheme: Theme = {
  variant: 'dark',
  color: {
    neutral,
    primary: {
      0: darkColors.primary0,
      10: darkColors.primary10,
      20: darkColors.primary20,
      30: darkColors.primary30,
      40: darkColors.primary40,
      50: darkColors.primary50,
      60: darkColors.primary60,
      70: darkColors.primary70,
      80: darkColors.primary80,
      90: darkColors.primary90,
      100: darkColors.primary100
    }
  }
};
