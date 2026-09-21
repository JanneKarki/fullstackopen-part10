import { Pressable, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 15,
  },
  reviewContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  rating: {
    color: theme.colors.primary,
  },
  contentContainer: {
    flexShrink: 1,
  },
  createdAt: {
    marginTop: 5,
  },
  text: {
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    borderRadius: 5,
    flexGrow: 1,
    padding: 15,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: theme.colors.appBarText,
    textAlign: 'center',
  },
});

const ReviewItem = ({
  review,
  showRepositoryName,
  onViewRepository,
  onDeleteReview,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.rating}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {showRepositoryName
              ? review.repository.fullName
              : review.user.username}
          </Text>
          <Text color="textSecondary" style={styles.createdAt}>
            {format(new Date(review.createdAt), 'dd MMM yyyy')}
          </Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>
      {onViewRepository && onDeleteReview && (
        <View style={styles.actionsContainer}>
          <Pressable
            style={[styles.button, styles.viewButton]}
            onPress={onViewRepository}
          >
            <Text fontWeight="bold" style={styles.buttonText}>
              View repository
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={onDeleteReview}
          >
            <Text fontWeight="bold" style={styles.buttonText}>
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
