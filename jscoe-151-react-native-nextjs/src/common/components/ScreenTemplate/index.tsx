import { FC, useState } from "react";
import { KeyboardAvoidingView, LayoutChangeEvent, ScrollView, View } from "react-native";
import { useStyles } from "../../hooks/useStyles";
import { Header } from "../Header";

interface Props {
  noPadding?: boolean; // utilize Grid.Col gutter property instead.
  disableScroll?: boolean;
  hideHeader?: boolean;
}

export const ScreenTemplate: FC<Props> = ({ noPadding, disableScroll, hideHeader, children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const styles = useStyles((theme, queries) => ({
    fill: {
      flex: 1,
      position: 'relative',
      backgroundColor: theme.color.neutral[10],
      paddingHorizontal: noPadding ? 0 : 8,
      paddingTop: headerHeight
    },
    wrapper: {
      flexGrow: 1,
      width: queries.isLarge ? 1200 : undefined,
      marginLeft: queries.isLarge ? 'auto' : undefined,
      marginRight: queries.isLarge ? 'auto' : undefined,
    },
    headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0
    }
  }));

  const content =
    disableScroll
      ? (
        <>{children}</>
      )
      : (
        <ScrollView>{children}</ScrollView>
      );

  const handleHeaderOnLayout = (e: LayoutChangeEvent) => {
    if (headerHeight > 0) return;
    setHeaderHeight(e.nativeEvent.layout.height)
  }

  return (
    <>
      <KeyboardAvoidingView style={styles.fill}>
        <View style={styles.wrapper}>{content}</View>
        {!hideHeader && (
          <View onLayout={handleHeaderOnLayout} style={styles.headerContainer}>
            <Header />
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  );
};
