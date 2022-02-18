import { FC, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

import BSheet from '../../../common/components/BottomSheet';
import { useRouter } from '../../../common/hooks/useRouter';
import { useStyles } from '../../../common/hooks/useStyles';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useMediaQueries } from '../../../common/hooks/useMediaQueries';

export const PostPhoto: FC = () => {
  const { isDesktop } = useMediaQueries()
  const [isPosting, setIsPosting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigation = useRouter();
  const ref = useRef<BottomSheetMethods>(null)
  const styles = useStyles((theme, _, StyleSheet) => ({
    content: {
      paddingVertical: 38,
    },
    contentWithImage: {
      marginTop: 16,
      position: 'relative'
    },
    text: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'blue',
      textAlign: 'center'
    },
    post: {
      fontWeight: 'bold'
    },
    disabled: {
      color: theme.color.neutral[30]
    },
    icon: {
      position: 'absolute',
      right: 8,
      top: 8,
      zIndex: 9
    },
    loadingBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(120, 120, 120, .1)',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }));

  useEffect(() => {
    ref.current?.expand();
  }, [])

  const handleDismiss = () => !isDesktop && navigation.goBack();

  const handleOnPress = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImageUrl(result.uri);
      }
  };

  const handleOnPost = () => {
    setIsPosting(true)
    ref.current?.snapToPosition('25%');
    setTimeout(() => 
      isDesktop ? ref.current?.forceClose : handleDismiss()
    , 2500)
  };

  return (
    <>
      {isPosting && (
        <View style={styles.loadingBackground}>
          <ActivityIndicator color={"#0a66c2"} size="large" />
        </View>
      )}
      <BSheet 
        ref={ref} 
        title="Photo" 
        onClose={handleDismiss} 
        headerStyle={{ paddingHorizontal: 16 }} 
        innerStyle={{ paddingHorizontal: 16 }}
        rightSlot={
          <TouchableOpacity onPress={handleOnPost}>
            <Text 
              style={[styles.post, imageUrl === null && styles.disabled]}
            >
              Post
            </Text>
          </TouchableOpacity>
        }
      >
        {imageUrl === null ? (
          <TouchableOpacity style={styles.content} onPress={handleOnPress}>
            <Text style={styles.text}>Select images to share</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.contentWithImage}>
            <AntDesign 
              name="closecircleo" 
              size={24} 
              color="blue" 
              style={styles.icon} 
              onPress={() => setImageUrl(null)}
            />
            <Image style={{ width: '100%', height: 500 }} source={{ uri: imageUrl }} />
          </View>
        )}
      </BSheet>
    </>
  );
};
