import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import * as Colours from '../../styles/colours';
import {getItemsByCategory} from '../../services/inventory';

const ShopScreen = ({route, navigation}) => {
  const [animating, setAnimating] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const {category} = route.params;

  React.useEffect(() => {
    let isMounted = true;
    getItemsByCategory(category)
      .then(results => {
        if (isMounted) {
          if (results.success) {
            setProducts(results.data);
          }
        }
      })
      .catch(err => {
        if (isMounted) console.error(err);
      })
      .finally(() => setAnimating(false));
    return () => {
      isMounted = false;
    };
  }, [products]);

  const onProductPress = productId =>
    navigation.navigate('Product', {
      productId: productId,
    });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {animating ? (
          <ActivityIndicator size="large" color={Colours.BURNT_SIENNA} />
        ) : (
          <FlatList
            data={products}
            keyExtractor={item => item.ProductId}
            renderItem={({item}) => (
              <TouchableOpacity
                key={item.ProductId}
                onPress={() => onProductPress(item.ProductId)}>
                <Card style={styles.productCard}>
                  <Card.Cover
                    style={styles.productImage}
                    source={{uri: item.Image}}
                    resizeMode="contain"
                  />
                  <Card.Content>
                    <Title style={styles.productNameText}>{item.Title}</Title>
                    <Paragraph style={styles.productPriceText}>
                      ${item.Price}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  productsView: {
    marginHorizontal: 10,
    marginVertical: 0,
  },
  productCard: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  productImage: {
    padding: 10,
    backgroundColor: 'white',
  },
  productNameText: {
    fontSize: 16,
  },
  productPriceText: {
    fontSize: 14,
  },
});
