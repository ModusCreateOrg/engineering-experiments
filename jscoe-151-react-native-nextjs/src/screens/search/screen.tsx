import { FC } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { ScreenTemplate } from '../../common/components/ScreenTemplate';
import { SearchHeader } from '../../common/components/SearchHeader';
import { Spacer } from '../../common/components/Spacer';
import { useStyles } from '../../common/hooks/useStyles';

export const SearchScreen: FC = () => {
  const styles = useStyles((theme) => ({
    container: {
      paddingHorizontal: 12
    },
    sectionTop: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    title: {
      color: theme.color.neutral[60]
    },
    titleClear: {
      color: theme.color.neutral[60],
      fontWeight: 'bold'
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 24
    },
    itemText: {
      fontWeight: 'bold',
      fontSize: 17,
      marginLeft: 12
    }
  }));

  return (
    <ScreenTemplate noPadding hideHeader>
      <SafeAreaView>
        <SearchHeader />
        <Spacer height={12} />
        <View style={styles.container}>
          <View style={styles.sectionTop}>
            <Text style={styles.title}>Recent searches</Text>
            <Text style={styles.titleClear}>Clear</Text>
          </View>
          {['Modus Create', 'Awesome company'].map((item, i) => (
            <View key={i} style={styles.item}>
              <MaterialIcons name="timer" size={24} color="#666666" />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScreenTemplate>
  );
};
