import { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useStyles } from '../../hooks/useStyles';
import { Grid } from '../Grid';
import { Spacer } from '../Spacer';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { useRouter } from '../../hooks/useRouter';

export const Header: FC = () => {
  const { top: topInset } = useSafeAreaInsets();
  const { isDesktop } = useMediaQueries();
  const { navigate } = useRouter();

  const styles = useStyles((theme) => ({
    container: {
      backgroundColor: theme.color.neutral[0],
      borderColor: theme.color.neutral[10],
      borderBottomWidth: 1
    },
    right: {
      marginLeft: 'auto'
    },
    logo: {
      height: 24,
      width: 24,
      backgroundColor: '#0a66c2',
      marginRight: 12
    },
    logoText: {
      fontWeight: 'bold'
    },
    pod: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    grid: {
      alignItems: 'center'
    },
    textInput: {
      backgroundColor: theme.color.neutral[10],
      borderRadius: 8,
      padding: 12
    },
    icons: {
      flexDirection: 'row'
    },
    icon: {
      marginLeft: 24
    }
  }));

  return (
    <View style={styles.container}>
      <Spacer height={isDesktop ? 16 : topInset} />
      <Grid style={styles.grid}>
        <Grid.Col>
          <View style={styles.pod}>
            <View style={styles.logo} />
            <Grid.Desktop>
              <Text style={styles.logoText}>LOGO</Text>
            </Grid.Desktop>
            <Grid.Mobile>
              <TouchableOpacity onPress={() => navigate('Search')}>
                <FontAwesome name="search" size={24} color="#666666" />
              </TouchableOpacity>
            </Grid.Mobile>
          </View>
        </Grid.Col>
        <Grid.Col desktopOnly>
          <TextInput onFocus={() => navigate('Search')} placeholder="Search" style={styles.textInput} />
        </Grid.Col>
        <Grid.Col>
          <View style={styles.right}>
            <Grid.Mobile>
              <Entypo name="menu" size={32} color="#666666" />
            </Grid.Mobile>
            <Grid.Desktop>
              <View style={styles.icons}>
                <TouchableOpacity>
                  <FontAwesome name="home" size={24} color="#666666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                  <MaterialCommunityIcons name="bell" size={24} color="#666666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                  <FontAwesome name="user" size={24} color="#666666" />
                </TouchableOpacity>
              </View>
            </Grid.Desktop>
          </View>
        </Grid.Col>
      </Grid>
      <Spacer height={16} />
    </View>
  );
};
