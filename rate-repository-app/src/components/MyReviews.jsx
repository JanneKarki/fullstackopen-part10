import { useQuery } from '@apollo/client/react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';

import ReviewItem from './ReviewItem';
import { GET_ME } from '../graphql/queries';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  const reviews = data?.me
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const confirmDeleteReview = (review) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview(review.id);
            refetch();
          },
        },
      ],
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          showRepositoryName
          onViewRepository={() => navigate(`/repositories/${item.repository.id}`)}
          onDeleteReview={() => confirmDeleteReview(item)}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
