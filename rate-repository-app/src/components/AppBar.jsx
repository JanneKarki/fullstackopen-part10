import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useApolloClient, useQuery } from '@apollo/client/react';

import AppBarTab from './AppBarTab';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {data?.me ? (
          <AppBarTab onPress={signOut}>Sign out</AppBarTab>
        ) : (
          <AppBarTab to="/signin">Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
