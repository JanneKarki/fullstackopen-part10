import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchInput: {
    backgroundColor: theme.colors.repositoryItemBackground,
    borderRadius: 5,
    margin: 15,
    padding: 15,
  },
});

const orderingPrinciples = {
  latest: {
    label: 'Latest repositories',
    variables: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  },
  highestRated: {
    label: 'Highest rated repositories',
    variables: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  },
  lowestRated: {
    label: 'Lowest rated repositories',
    variables: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
  },
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({
  searchKeyword,
  onSearchKeywordChange,
  selectedPrinciple,
  onPrincipleChange,
}) => {
  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories"
        value={searchKeyword}
        onChangeText={onSearchKeywordChange}
      />
      <Picker selectedValue={selectedPrinciple} onValueChange={onPrincipleChange}>
        {Object.entries(orderingPrinciples).map(([value, { label }]) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  onPressItem,
  ListHeaderComponent,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressItem(item)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

const RepositoryList = () => {
  const [selectedPrinciple, setSelectedPrinciple] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories({
    ...orderingPrinciples[selectedPrinciple].variables,
    searchKeyword: debouncedSearchKeyword,
  });
  const navigate = useNavigate();

  const onPressItem = (repository) => {
    navigate(`/repositories/${repository.id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPressItem={onPressItem}
      ListHeaderComponent={
        <RepositoryListHeader
          searchKeyword={searchKeyword}
          onSearchKeywordChange={setSearchKeyword}
          selectedPrinciple={selectedPrinciple}
          onPrincipleChange={setSelectedPrinciple}
        />
      }
    />
  );
};

export default RepositoryList;
