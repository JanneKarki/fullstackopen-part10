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

const AppBarTab = ({ children, to, onPress }) => {
  const content = (
    <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
      {children}
    </Text>
  );

  if (to) {
    return (
      <Link to={to} component={Pressable} style={styles.tab}>
        {content}
      </Link>
    );
  }

  return (
    <Pressable style={styles.tab} onPress={onPress}>
      {content}
    </Pressable>
  );
};

export default AppBarTab;
