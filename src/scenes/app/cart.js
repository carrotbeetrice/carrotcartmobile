import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Colours from '../../styles/colours';
import {getCart} from '../../services/cart';

const CartScreen = ({navigation}) => {
  const [animating, setAnimating] = React.useState(true);
  const [cart, setCart] = React.useState([]);

  const onProductPress = productId => {
    console.log('Product selected:', productId);
    navigation.navigate('Product', {
      productId: productId,
    });
  };

  React.useEffect(() => {
    let isMounted = true;
    getCart()
      .then(results => {
        if (isMounted) {
          if (results.success) setCart(results.data);
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
  }, [cart]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {animating ? (
          <ActivityIndicator size="large" color={Colours.PERSIAN_GREEN} />
        ) : cart.length === 0 ? (
          <View style={styles.emptyWishlistSection}>
            <Text>Your cart is empty. Start shopping now!</Text>
            <Icon name="cart" size={50} color={Colours.PERSIAN_GREEN} />
          </View>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={item => item.productid}
            renderItem={({item}) => (
              <View style={styles.itemCard} key={item.productid}>
                <TouchableOpacity
                  onPress={() => onProductPress(item.productid)}>
                  <View style={styles.itemInfo}>
                    <Image
                      style={styles.itemImage}
                      source={{uri: item.image}}
                    />
                    <View style={styles.itemText}>
                      <Text style={styles.itemNameText} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text style={styles.itemPriceText}>${item.price}</Text>
                    </View>
                  </View>
                  <View style={styles.purchaseInfoSection}>
                    <Text style={styles.purchaseInfoLabelText}>Quantity</Text>
                    <Text>{item.quantity}</Text>
                  </View>
                  <View style={styles.purchaseInfoSection}>
                    <Text style={styles.purchaseInfoLabelText}>Subtotal</Text>
                    <Text>{item.subtotal}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  itemCard: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemInfo: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  itemImage: {
    padding: 10,
    backgroundColor: 'white',
    resizeMode: 'contain',
    height: 70,
    width: 70,
  },
  itemText: {
    marginLeft: 10,
    width: '80%',
  },
  itemNameText: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemPriceText: {
    fontSize: 13,
  },
  purchaseInfoSection: {
    marginHorizontal: 10,
    marginVertical: 5,
    // padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseInfoLabelText: {
    // fontWeight: 'bold',
    marginRight: 10,
  },
});
