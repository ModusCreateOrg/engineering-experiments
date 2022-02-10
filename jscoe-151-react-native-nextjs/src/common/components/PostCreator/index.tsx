import { FC } from "react";
import { View, TextInput, Text, TouchableOpacity, Platform } from "react-native";

import { Image } from '../Image';
import UserAvatar from '../../../../assets/images/user.jpeg';
import { useStyles } from "../../hooks/useStyles";
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from "../../hooks/useRouter";
import { useModal } from "../../hooks/useModal.web";
import { PostPhoto as DesktopPostPhoto } from "../../../screens/modals/PostPhoto/index.web";

export const PostCreator: FC = () => {
  const isMobile = Platform.OS !== 'web';
  const { openModal } = useModal();
  const { navigate } = useRouter();
  const styles = useStyles((theme) => ({
    container: {
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: theme.color.neutral[0],
      borderWidth: 1,
      borderColor: theme.color.neutral[20],
      padding: 12
    },
    top: {
      flexDirection: 'row'
    },
    bottom: {
      marginTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    img: {
      width: 34,
      height: 34,
      borderRadius: 17
    },
    input: {
      paddingHorizontal: 12,
      borderRadius: 17,
      flex: 1,
      marginLeft: 12,
      borderWidth: 1,
      borderColor: theme.color.neutral[20],
    },
    pod: {
      flexDirection: 'row'
    },
    label: {
      marginLeft: 6,
      color: theme.color.neutral[70],
      fontWeight: 'bold'
    }
  }));

  const handleIconOnPress = (path: string) =>
    isMobile
      ? navigate(`Modals/${path}`)
      : openModal(<DesktopPostPhoto />)

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={UserAvatar} style={styles.img} />
        <TextInput placeholder="Start a post" style={styles.input} />
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.pod} onPress={() => handleIconOnPress('PostPhoto')}>
          <FontAwesome name="photo" size={16} color="black" />
          <Text style={styles.label}>Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pod}>
          <FontAwesome name="video-camera" size={16} color="black" />
          <Text style={styles.label}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pod}>
          <FontAwesome name="calendar" size={16} color="black" />
          <Text style={styles.label}>Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pod}>
          <FontAwesome name="newspaper-o" size={16} color="black" />
          <Text style={styles.label}>Article</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
