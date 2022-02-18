import { FC } from "react";
import { View, Text } from "react-native";

import { useStyles } from "../../hooks/useStyles";
import { Image } from '../Image';
import UserAvatar from '../../../../assets/images/user.jpeg';
import { useMediaQueries } from "../../hooks/useMediaQueries";

export const HeroCard: FC = () => {
  const { isLarge } = useMediaQueries();
  const styles = useStyles((theme) => ({
    container: {
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: theme.color.neutral[0],
      borderWidth: 1,
      borderColor: theme.color.neutral[20],
    },
    top: {
      flexGrow: 1,
      height: 75,
      overflow: 'hidden',
      backgroundColor: theme.color.primary[30]
    },
    bottom: {
      paddingHorizontal: 8,
      paddingBottom: 16,
      paddingTop: 32,
      alignItems: 'center',
      position: 'relative'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 16,
      color: theme.color.neutral[70]
    },
    subTitle: {
      fontSize: 13,
      color: theme.color.neutral[50],
      textAlign: 'center'
    },
    bold: {
      fontWeight: 'bold',
      color: theme.color.neutral[100]
    },
    italic: {
      fontStyle: 'italic'
    },
    avatarContainer: {
      position: 'absolute',
      top: -32,
      width: 64,
      height: 64,
      borderRadius: 32,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: theme.color.neutral[0]
    },
    section: {
      borderTopWidth: 1,
      borderColor: theme.color.neutral[10],
      paddingVertical: 16
    },
    row: {
      marginBottom: 8,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    blueText: {
      fontWeight: 'bold',
      color: 'blue'
    }
  }));

  return (
    <View style={styles.container}>
      <Image style={styles.top} source={{ uri: 'https://media-exp1.licdn.com/dms/image/C4E16AQF6LJYMCraxBQ/profile-displaybackgroundimage-shrink_350_1400/0/1583719885178?e=1649289600&v=beta&t=TmGeRvfCFW5-Q5V--w2OAVys0jj480PY3m38mrSwAVY' }} />
      <View style={styles.bottom}>
        <Image source={UserAvatar} style={styles.avatarContainer} />
        <Text style={styles.title}>Gil Viana</Text>
        <Text style={styles.subTitle}>
          <Text style={styles.italic}>React Native developer</Text> at{" "}
          <Text style={styles.bold}>Modus Create</Text>
        </Text>
      </View>
      {isLarge && (
        <>
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={[styles.subTitle, styles.bold]}>Who viewed your profile</Text>
              <Text style={styles.blueText}>153</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.subTitle, styles.bold]}>Views of your post</Text>
              <Text style={styles.blueText}>42</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};
