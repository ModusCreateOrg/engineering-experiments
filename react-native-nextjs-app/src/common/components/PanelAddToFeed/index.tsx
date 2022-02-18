import { FC } from "react";
import { View, Text } from "react-native";

import { RANDOM_USERS } from "../../../screens/home/mock";
import { useStyles } from "../../hooks/useStyles";
import { Image } from '../Image';

export const PanelAddToFeed: FC = () => {
  const styles = useStyles((theme) => ({
    container: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.color.neutral[20],
      padding: 12,
      backgroundColor: theme.color.neutral[0]
    },
    top: {},
    title: {
      fontWeight: 'bold',
      fontSize: 17,
      marginBottom: 24
    },
    profileAvatar: {
      width: 34,
      height: 34,
      borderRadius: 17,
      marginRight: 12
    },
    pod: {
      flexDirection: 'row',
      marginBottom: 12
    },
    podTitle: {
      fontWeight: 'bold'
    },
    podSubtitle: {
      color: theme.color.neutral[50]
    },
    bottom: {
      marginTop: 12
    },
    footerTitle: {
      fontWeight: 'bold',
      color: theme.color.neutral[50]
    }
  }));

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Add to your feed</Text>
      </View>
      {RANDOM_USERS.map((user, i) => (
        <View key={i} style={styles.pod}>
          <Image source={{ uri: user.profilePic }} style={styles.profileAvatar} />
          <View>
            <Text style={styles.podTitle}>{user.username}</Text>
            <Text style={styles.podSubtitle}>{user.title}</Text>
          </View>
        </View>
      ))}
      <View style={styles.bottom}>
        <Text style={styles.footerTitle}>View all recommendations</Text>
      </View>
    </View>
  );
};
