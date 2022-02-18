import { forwardRef, MutableRefObject, Ref } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import BottomSheetComponent, {
  useBottomSheetDynamicSnapPoints,
  BottomSheetScrollView,
  BottomSheetView,
  BottomSheetModal,
  BottomSheetProps,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacer } from '../Spacer';
import { useStyles } from '../../hooks/useStyles';
import { RefObject } from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

interface Props extends Omit<BottomSheetProps, 'snapPoints'> {
  title?: string;
  children: React.ReactNode;
  innerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  rightSlot?: React.ReactNode;
}

const BottomSheet = ({ 
  title, 
  children, 
  innerStyle, 
  headerStyle, 
  rightSlot, 
  ...props
}: Props, ref: Ref<BottomSheetMethods>) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const styles = useStyles((theme) => ({
    header: {
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderColor: theme.color.neutral[30],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    text: {
      fontWeight: 'bold',
      fontSize: 17
    }
  }))

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    handleContentLayout
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT', '95%']);

  return (
    <BottomSheetComponent
      {...props}
      ref={ref}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      snapPoints={animatedSnapPoints}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior={'close'}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
    >
      <View style={[styles.header, headerStyle]}>
        <Text style={styles.text}>{title}</Text>
        {rightSlot && (
          <View>
            {rightSlot}
          </View>
        )}
      </View>
      <BottomSheetView style={innerStyle}>
        <BottomSheetScrollView bounces={false} onLayout={handleContentLayout} contentContainerStyle={{ paddingBottom: bottomInset }}>
          {children}
          <Spacer height={40} />
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheetComponent>
  );
};

const BSheet = forwardRef(BottomSheet);
export default BSheet;
