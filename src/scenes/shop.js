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
import * as Colours from '../styles/colours';
import {getItemsByCategory} from '../services/inventory';

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
        <ScrollView contentContainerStyle={styles.scrollView}>
          {animating ? (
            <ActivityIndicator size="large" color={Colours.BURNT_SIENNA} />
          ) : (
            <View style={styles.productsView}>
              {products.map(product => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => onProductPress(product.id)}>
                  <Card style={styles.productCard}>
                    <Card.Cover
                      style={styles.productImage}
                      source={{uri: product.image}}
                      resizeMode="contain"
                    />
                    <Card.Content>
                      <Title style={styles.productNameText}>
                        {product.title}
                      </Title>
                      <Paragraph style={styles.productPriceText}>
                        ${product.price}
                      </Paragraph>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
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
    marginHorizontal: 30,
    marginVertical: 0,
  },
  productCard: {
    marginVertical: 10,
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
