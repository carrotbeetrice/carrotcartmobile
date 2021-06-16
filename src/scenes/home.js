import React from 'react';
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Button} from '_atoms';
import * as Colours from '../styles/colours';
import {getAllCategories} from '../services/inventory';

const HomeScreen = () => {
  const [animating, setAnimating] = React.useState(true);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    setTimeout(() => {
      getAllCategories()
        .then(results => {
          if (results.success) {
            setCategories(results.data);
          } else {
            console.error(results.message);
          }
        })
        .catch(err => console.error(err))
        .finally(() => setAnimating(false));
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ActivityIndicator
            animating={animating}
            size="large"
            color={Colours.PERSIAN_GREEN}
          />
          {/* {categories.map(category => (
            <Text>{category}</Text>
          ))} */}
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
  categorySection: {},
});
