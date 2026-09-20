import { Image, StyleSheet, View } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flexShrink: 1,
  },
  description: {
    marginTop: 5,
  },
  languageContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  languageText: {
    color: theme.colors.languageTagText,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    marginTop: 5,
  },
});

const formatCount = (count) => {
  return count >= 1000 ? `${Math.round(count / 100) / 10}k` : String(count);
};

const RepositoryStatsItem = ({ count, label }) => {
  return (
    <View style={styles.statItem}>
      <Text fontWeight="bold">{formatCount(count)}</Text>
      <Text color="textSecondary" style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
};

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {repository.fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {repository.description}
          </Text>
          <View style={styles.languageContainer}>
            <View style={styles.languageTag}>
              <Text style={styles.languageText}>{repository.language}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <RepositoryStatsItem
          count={repository.stargazersCount}
          label="Stars"
        />
        <RepositoryStatsItem count={repository.forksCount} label="Forks" />
        <RepositoryStatsItem count={repository.reviewCount} label="Reviews" />
        <RepositoryStatsItem count={repository.ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
