import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Theme, useTheme } from '../theme';
import { MediaQueriesReturnType, useMediaQueries } from './useMediaQueries';

type StyleFunction = (
  theme: Theme,
  mediaQueries: MediaQueriesReturnType,
  sheet: typeof StyleSheet
) => StyleSheet.NamedStyles<any>;

export const useStyles = (style: StyleFunction) => {
  const { theme } = useTheme();
  const mediaQueries = useMediaQueries();

  const styles = useCallback(
    () => getStyles(theme, StyleSheet, mediaQueries, style),
    [style, theme]
  );
  return styles();
};

const getStyles = (
  theme: Theme,
  sheet: typeof StyleSheet,
  mediaQueries: MediaQueriesReturnType,
  styles: StyleFunction
) => StyleSheet.create(styles(theme, mediaQueries, StyleSheet));
