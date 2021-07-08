import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import * as Colours from '_styles/colours';
import {getItemsByCategory} from '../../services/inventory';

const ShopScreen = ({route, navigation}) => {
  const [animating, setAnimating] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const {category} = route.params;

  React.useEffect(() => {
    getItemsByCategory(category)
      .then(results => {
        if (results.success) {
          setProducts(results.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setAnimating(false));
  }, []);

  const onProductPress = productId => {
    console.log('Product selected:', productId);
    navigation.navigate('Product', {
      productId: productId,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {animating ? (
          <ActivityIndicator size="large" color={Colours.BURNT_SIENNA} />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.productsView}>
              {products.map(product => (
                <TouchableOpacity
                  key={product.ProductId}
                  onPress={() => onProductPress(product.ProductId)}>
                  <Card style={styles.productCard}>
                    <Card.Cover
                      style={styles.productImage}
                      source={{uri: product.Image}}
                      resizeMode="contain"
                    />
                    <Card.Content>
                      <Title style={styles.productNameText}>
                        {product.Title}
                      </Title>
                      <Paragraph style={styles.productPriceText}>
                        ${product.Price}
                      </Paragraph>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
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
  scrollView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  productsView: {
    marginHorizontal: 10,
    marginVertical: 0,
  },
  productCard: {
    margin: 10,
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
