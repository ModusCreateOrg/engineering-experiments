import { FC } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { Grid } from "../Grid";
import { useStyles } from "../../hooks/useStyles";
import { useRouter } from "../../hooks/useRouter";

export const SearchHeader: FC = () => {
  const { goBack } = useRouter();

  const styles = useStyles((theme, queries) => ({
    container: {
      paddingTop: queries.isDesktop ? 12 : undefined,
      borderBottomWidth: 1,
      borderColor: theme.color.neutral[20],
      paddingBottom: 12
    },
    grid: {
      alignItems: 'center'
    },
    textInput: {
      backgroundColor: theme.color.neutral[20],
      borderRadius: 8,
      padding: 12
    },
    cancelText: {
      fontWeight: "bold"
    }
  }));

  return (
    <View style={styles.container}>
      <Grid style={styles.grid}>
        <Grid.Col flex={0.5}>
          <Grid.Mobile>
            <TouchableOpacity onPress={() => goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="#666666" />
            </TouchableOpacity>
          </Grid.Mobile>
          <Grid.Desktop>
            <TouchableOpacity onPress={() => goBack()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </Grid.Desktop>
        </Grid.Col>
        <Grid.Col flex={6}>
          <TextInput placeholder="Search" style={styles.textInput} />
        </Grid.Col>
      </Grid>
    </View>
  );
};
