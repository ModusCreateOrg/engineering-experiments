import { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from "react-native-reanimated";
// import { Keyframe } from 'react-native-reanimated';

import { useStyles } from "../../hooks/useStyles";
import { Image } from '../Image';

export interface PostObj {
  username: string;
  content: string;
  media?: {
    type: 'video' | 'image';
    url: string;
  }
  profilePic?: string;
  title?: string;
}

enum AnimationValues {
  LIKE_ROTATE_INITIAL = 0,
  LIKE_SCALE_INITIAL = 1,
  LIKE_ROTATE_FINAL = -0.4,
  LIKE_SCALE_FINAL = 1.2
}

export const Post: FC<PostObj> = (props) => {
  const rotate = useSharedValue(AnimationValues.LIKE_ROTATE_INITIAL);
  const scale = useSharedValue(AnimationValues.LIKE_SCALE_INITIAL);

  const styles = useStyles((theme, _queries, StyleSheet) => ({
    container: {
      backgroundColor: theme.color.neutral[0],
      borderColor: theme.color.neutral[20],
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 6,
      overflow: 'hidden'
    },
    top: {
      padding: 12,
    },
    info: {
      flexDirection: 'row',
      marginBottom: 12
    },
    right: {
      marginLeft: 12,
      flex: 1,
    },
    username: {
      fontWeight: "bold",
      color: theme.color.neutral[100]
    },
    title: {
      color: theme.color.neutral[60]
    },
    contentText: {
      color: theme.color.neutral[100]
    },
    media: {
      height: 240,
    },
    mediaImage: {
      ...StyleSheet.absoluteFillObject
    },
    profileAvatar: {
      width: 34,
      height: 34,
      borderRadius: 17
    },
    pod: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    label: {
      marginLeft: 6,
      color: theme.color.neutral[70],
      fontWeight: 'bold'
    },
    bottom: {
      paddingVertical: 18,
      paddingHorizontal: 36,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  }));

  // const keyframe = new Keyframe({
  //   0: {
  //     transform: [{ rotate: '0deg' }],
  //   },
  //   45: {
  //     transform: [{ rotate: '100deg' }]
  //   },
  //   100: {
  //     transform: [{ rotate: '45deg' }],
  //   },
  // });

  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: rotate.value.toString(),
      },
      {
        scale: scale.value,
      }
    ]
  }));

  const animateLikeButton = () => {
    'worklet';
    rotate.value = withSequence(
      withTiming(AnimationValues.LIKE_ROTATE_FINAL),
      withTiming(AnimationValues.LIKE_ROTATE_INITIAL),
    );
    scale.value = withSequence(
      withSpring(AnimationValues.LIKE_SCALE_FINAL),
      withSpring(AnimationValues.LIKE_SCALE_INITIAL)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.info}>
          <Image style={styles.profileAvatar} source={{ uri: props.profilePic }} />
          <View style={styles.right}>
            <Text style={styles.username}>{props.username}</Text>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.contentText}>{props.content}</Text>
        </View>
      </View>
      {props?.media && (
        <View style={styles.media}>
          {props.media.type === 'image' && (
            <Image source={{ uri: props.media.url }} style={styles.mediaImage} />
          )}
        </View>
      )}
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.pod} onPress={animateLikeButton}>
          <Animated.View style={likeAnimatedStyle}>
            <FontAwesome name="thumbs-o-up" size={24} color="black" />
          </Animated.View>
          <Text style={styles.label}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pod}>
          <FontAwesome name="comment-o" size={24} color="black" />
          <Text style={styles.label}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
