import { FC, useState } from "react";
import { Text, TouchableOpacity, View, Image, Button, ActivityIndicator } from "react-native";
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { useModal } from "../../../common/hooks/useModal.web";
import { useStyles } from "../../../common/hooks/useStyles";

export const PostPhoto: FC = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { closeModal } = useModal();
  const styles = useStyles((theme, _q) => ({
    container: {
      alignContent: 'flex-start',
      margin: 'auto',
      backgroundColor: theme.color.neutral[0],
      flexDirection: 'column',
      minWidth: 500,
      maxWidth: 900,
      borderColor: theme.color.neutral[20],
      borderWidth: 1,
      borderRadius: 8,
      overflow: 'hidden',
    },
    content: {
      paddingVertical: 58,
      paddingHorizontal: 32,
      alignItems: 'center'
    },
    contentWithImage: {
      paddingHorizontal: 32,
      marginTop: 16,
      position: 'relative',
      alignItems: 'center'
    },
    loadingBackground: {
      padding: 48,
      justifyContent: 'center',
      alignItems: 'center'
    },
    header: {
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor: theme.color.neutral[30],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    text: {
      fontWeight: 'bold',
      fontSize: 17
    },
    text2: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'blue',
      textAlign: 'center'
    },
    button: {
      marginRight: 16,
      marginVertical: 32,
      marginLeft: 'auto',
      maxWidth: 200,
      borderRadius: 20,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'blue',
      backgroundColor: 'transparent',
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    buttonText: {
      color: 'blue',
      fontWeight: 'bold'
    },
    icon: {
      position: 'absolute',
      right: 8,
      top: 8,
      zIndex: 9
    }
  }));

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
    setTimeout(() => closeModal(), 2500)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Post</Text>
        <EvilIcons
          onPress={closeModal}
          name="close"
          size={24}
          color="black"
        />
      </View>
      {imageUrl === null ? (
        <TouchableOpacity style={styles.content} onPress={handleOnPress}>
          <Text style={styles.text2}>Select images to share</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.contentWithImage}>
          {isPosting ? (
            <View style={styles.loadingBackground}>
              <ActivityIndicator color={"#0a66c2"} size="large" />
            </View>
          ) : (
            <>
              <View style={{ width: 160, position: 'relative' }}>
                <Image style={{ width: undefined, height: 160 }} source={{ uri: imageUrl }} />
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color="blue"
                  style={styles.icon}
                  onPress={() => setImageUrl(null)}
                />
              </View>
              <View style={{ marginLeft: 'auto' }}>
                <TouchableOpacity style={styles.button} onPress={handleOnPost}>
                  <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};
