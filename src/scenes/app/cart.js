import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Text, Title, Subheading, Card, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Colours from '../../styles/colours';
import {getCart, deleteFromCart} from '../../services/cart';

const CartScreen = ({navigation}) => {
  const [animating, setAnimating] = React.useState(true);
  const [cart, setCart] = React.useState([]);

  const handleProductPreview = productId =>
    navigation.navigate('Product', {
      productId: productId,
      isPreview: true,
    });

  const handleEditOrder = productInfo =>
    navigation.navigate('AddToCart', {
      productInfo: productInfo,
      headerTitle: 'Edit Order',
    });

  const confirmRemoveItem = productId =>
    Alert.alert(
      'Deleting item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Item deletion terminated'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleRemoveItem(productId),
          style: 'default',
        },
      ],
    );

  const handleRemoveItem = async productId => {
    try {
      const results = await deleteFromCart(productId);
      if (results.success) {
        let updatedCart = cart.filter(item => item.productid !== productId);
        setCart(updatedCart);
      } else {
        alert(results.message);
      }
    } catch (err) {
      console.error(err);
    }
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
          <View style={{alignItems: 'center'}}>
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
                  onPress={() => handleProductPreview(item.productid)}>
                  <View style={styles.itemInfo}>
                    <Image
                      style={styles.itemImage}
                      source={{uri: item.image}}
                    />
                    <View style={styles.itemText}>
                      <Title style={styles.itemNameText} numberOfLines={2}>
                        {item.title}
                      </Title>
                      <Subheading style={styles.itemInfoText}>
                        ${item.price}
                      </Subheading>
                      <View style={styles.purchaseInfoSection}>
                        <Subheading style={styles.purchaseInfoLabelText}>
                          Quantity:
                        </Subheading>
                        <Subheading style={styles.itemInfoText}>
                          {item.quantity}
                        </Subheading>
                      </View>
                      <View style={styles.purchaseInfoSection}>
                        <Subheading style={styles.purchaseInfoLabelText}>
                          Subtotal:
                        </Subheading>
                        <Subheading style={styles.itemInfoText}>
                          ${item.subtotal}
                        </Subheading>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <Card.Actions>
                  <IconButton
                    icon="pencil-outline"
                    color="grey"
                    size={25}
                    onPress={() => handleEditOrder(item)}
                    style={styles.actionIconButton}
                  />
                  <IconButton
                    icon="delete-outline"
                    color="grey"
                    size={25}
                    onPress={() => confirmRemoveItem(item.productid)}
                    style={styles.actionIconButton}
                  />
                </Card.Actions>
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
    borderRadius: 10,
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
    fontSize: 16,
  },
  itemInfoText: {
    fontSize: 14,
  },
  purchaseInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseInfoLabelText: {
    marginRight: 10,
    fontSize: 14,
  },
  actionIconButtonRow: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  actionIconButton: {
    margin: 0,
  },
});
