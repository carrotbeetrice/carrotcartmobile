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
import {getWishlist} from '../../services/wishlist';

const WishlistScreen = ({navigation}) => {
  const [animating, setAnimating] = React.useState(true);
  const [wishlist, setWishlist] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    getWishlist()
      .then(results => {
        if (isMounted) {
          if (results.success) setWishlist(results.data);
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
  }, [wishlist]);

  const onProductPress = productId =>
    navigation.navigate('Product', {
      productId: productId,
      isPreview: true,
    });

  const addToCart = productId => {
    console.log(`Product ${productId} added to cart!`);
  };

  const removeFromWishlist = productId => {
    console.log(`Product ${productId} removed from wishlist`);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {animating ? (
          <ActivityIndicator size="large" color={Colours.PERSIAN_GREEN} />
        ) : wishlist.length === 0 ? (
          <View style={styles.emptyWishlistSection}>
            <Text>Your wishlist is empty. Start shopping now!</Text>
            <Icon name="cart" size={50} color={Colours.PERSIAN_GREEN} />
          </View>
        ) : (
          <FlatList
            data={wishlist}
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
                </TouchableOpacity>
                <View style={styles.actionRow}>
                  <Card.Actions style={styles.actionIconButtonRow}>
                    <IconButton
                      icon="cart-plus"
                      color="grey"
                      size={25}
                      onPress={() => addToCart(item.productid)}
                      style={styles.actionIconButton}
                    />
                    <IconButton
                      icon="delete-outline"
                      color="grey"
                      size={25}
                      onPress={() => removeFromWishlist(item.productid)}
                      style={styles.actionIconButton}
                    />
                  </Card.Actions>
                </View>
              </View>
            )}
            keyExtractor={item => item.productid}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default WishlistScreen;

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
  itemsView: {
    marginHorizontal: 5,
    marginVertical: 0,
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
    alignItems: 'center',
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionIconButtonRow: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  actionIconButton: {
    margin: 0,
  },
  actionTextButton: {
    marginHorizontal: 10,
    color: 'grey',
  },
  emptyWishlistSection: {
    alignItems: 'center',
  },
});
