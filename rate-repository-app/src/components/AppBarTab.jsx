import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 10,
  },
  text: {
    color: theme.colors.appBarText,
  },
});

const AppBarTab = ({ children, to }) => {
  return (
    <Link to={to} component={Pressable} style={styles.tab}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
        {children}
      </Text>
    </Link>
  );
};

export default AppBarTab;
