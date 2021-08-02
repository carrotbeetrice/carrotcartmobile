import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Card, Title, Paragraph, IconButton, Divider} from 'react-native-paper';
import * as Colours from '_styles/colours';
import {getItemById} from '../../services/inventory';
import {addOrDeleteItem} from '../../services/wishlist';

const ProductScreen = ({route}) => {
  const [animating, setAnimating] = React.useState(true);
  const [productInfo, setProductInfo] = React.useState({});
  const {productId} = route.params;

  const addOrDeleteFromWishlist = async () => {
    if (!productId) console.error('Missing productId!');

    try {
      const results = await addOrDeleteItem(productId, productInfo.inwishlist);

      if (results.success) {
        setProductInfo({...productInfo, inwishlist: !productInfo.inwishlist});
        alert(results.message);
      } else {
        console.log(results.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = productId => alert(`Item ${productId} added to cart!`);

  React.useEffect(() => {
    getItemById(productId)
      .then(results => {
        if (results.success) setProductInfo(results.data);
      })
      .catch(err => console.error(err))
      .finally(() => setAnimating(false));
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {animating ? (
            <ActivityIndicator size="large" color={Colours.BURNT_SIENNA} />
          ) : (
            <Card style={styles.productCard}>
              <Card.Cover
                style={styles.productImage}
                source={{uri: productInfo.image}}
                resizeMode="contain"
              />
              <Divider />
              <Card.Actions>
                <IconButton
                  icon={productInfo.inwishlist ? 'heart' : 'heart-outline'}
                  color={productInfo.inwishlist ? 'red' : null}
                  size={25}
                  onPress={addOrDeleteFromWishlist}
                />
                <IconButton
                  icon="cart-outline"
                  size={25}
                  onPress={() => addToCart(productInfo.productid)}
                />
              </Card.Actions>
              <Card.Content>
                <Title style={styles.productNameText}>
                  {productInfo.title}
                </Title>
                <Paragraph>${productInfo.price}</Paragraph>
                <Paragraph>{productInfo.description}</Paragraph>
              </Card.Content>
            </Card>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  productsView: {
    padding: 20,
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
