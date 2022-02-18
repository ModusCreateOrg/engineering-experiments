import { FC } from "react";
import { View, ViewProps } from "react-native";
import { useStyles } from "../../hooks/useStyles";

interface GridElements {
  Col: typeof Col;
  Mobile: typeof Mobile;
  Desktop: typeof Desktop;
}

interface ColProps {
  gutter?: number;
  flex?: number;
  desktopOnly?: boolean;
}

const Mobile: FC = ({ children }) => {
  const styles = useStyles((_theme, queries) => ({
    container: {
      display: queries.isDesktop ? 'none' : 'flex'
    }
  }));
  return (
    <View style={styles.container}>{children}</View>
  )
}

const Desktop: FC = ({ children }) => {
  const styles = useStyles((_theme, queries) => ({
    container: {
      display: queries.isMobile ? 'none' : 'flex'
    }
  }));
  return (
    <View style={styles.container}>{children}</View>
  )
}

const Col: FC<ColProps> = ({ gutter = 12, flex = 1, desktopOnly, children }) => {
  const styles = useStyles((_theme, queries) => ({
    container: {
      display: desktopOnly && !queries.isDesktop ? 'none' : 'flex',
      flex,
      paddingHorizontal: gutter
    }
  }));

  return (
    <View style={styles.container}>{children}</View>
  );
};


export const Grid: FC<ViewProps> & GridElements = ({ style, children, ...props }) => {
  const styles = useStyles(() => ({
    container: {
      flex: 1,
      flexDirection: 'row'
    }
  }));

  return (
    <View style={[styles.container, style]} {...props}>{children}</View>
  );
};

Grid.Col = Col;
Grid.Mobile = Mobile;
Grid.Desktop = Desktop;
