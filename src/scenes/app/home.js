import React from 'react';
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Colours from '../../styles/colours';
import {getAllCategories} from '../../services/inventory';

const HomeScreen = ({navigation}) => {
  const [animating, setAnimating] = React.useState(true);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    getAllCategories()
      .then(results => {
        if (isMounted) {
          if (results.success) setCategories(results.data);
          else console.log(results.message);
        }
      })
      .catch(err => {
        if (isMounted) console.error(err);
      })
      .finally(() => setAnimating(false));
    return () => {
      isMounted = false;
    };
  }, [categories]);

  const onCategoryPress = category => {
    console.log('category selected:', category);
    navigation.navigate('Shop', {
      category: category,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Title style={styles.categoryViewTitle}>Shop categories</Title>
          {animating ? (
            <ActivityIndicator size="large" color={Colours.PERSIAN_GREEN} />
          ) : (
            <View style={styles.categoryView}>
              {categories.map(categoryObject => (
                <TouchableOpacity
                  key={categoryObject.CategoryId}
                  style={styles.categoryCard}
                  onPress={() => onCategoryPress(categoryObject.CategoryId)}>
                  <Icon name={categoryObject.Icon} size={25} />
                  <Text style={styles.categoryText}>
                    {categoryObject.CategoryName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  categoryViewTitle: {
    textAlign: 'center',
    marginVertical: 10,
  },
  categoryView: {
    margin: 10,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: 300,
  },
  categoryCard: {
    margin: 5,
    padding: 10,
    backgroundColor: Colours.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  categoryText: {
    fontSize: 18,
    paddingLeft: 10,
  },
});
