import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {BURNT_SIENNA} from '../../styles/colours';
import {addToCart, updateCartItem} from '../../services/cart';
import {Formik} from 'formik';

const CartFormScreen = ({route, navigation}) => {
  const {productInfo, editOrder} = route.params;
  const initialFormValues = {
    quantity: productInfo.quantity ? productInfo.quantity : 1,
  };

  const [quantity, setQuantity] = React.useState(initialFormValues.quantity);
  const [animating, setAnimating] = React.useState(false);

  const handleAddorUpdate = async () => {
    setAnimating(true);
    let results = null;

    try {
      if (editOrder) {
        results = await updateCartItem(productInfo.productid, quantity);
      } else {
        results = await addToCart(productInfo.productid, quantity);
      }

      setAnimating(false);

      if (results.success) {
        let successMessage = editOrder
          ? 'Your order has been successfully updated!'
          : 'Item successfully added to cart!';
        Alert.alert('Success', successMessage, [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
            style: 'default',
          },
        ]);
      } else {
        alert(results.message);
      }
    } catch (err) {
      console.error(err);
      setAnimating(false);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => setQuantity(quantity + 1);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <KeyboardAvoidingView enabled>
            <View style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Image
                  style={styles.itemImage}
                  source={{uri: productInfo.image}}
                />
                <View style={styles.itemText}>
                  <Text style={styles.itemNameText} numberOfLines={2}>
                    {productInfo.title}
                  </Text>
                  <Text style={styles.itemPriceText}>${productInfo.price}</Text>
                </View>
              </View>
            </View>
            <Formik
              initialValues={initialFormValues}
              onSubmit={handleAddorUpdate}>
              {({handleSubmit, setFieldValue}) => (
                <Fragment>
                  <View style={styles.inputSection}>
                    <Text style={styles.quantityPickerText}>Quantity</Text>
                    <View style={styles.quantityPicker}>
                      <Button
                        compact
                        color="grey"
                        mode="outlined"
                        icon="minus"
                        onPress={() => {
                          decrementQuantity();
                          setFieldValue('quantity', quantity, false);
                        }}
                      />
                      <Text style={styles.quantityPickerText}>{quantity}</Text>
                      <Button
                        compact
                        color="grey"
                        mode="outlined"
                        icon="plus"
                        onPress={() => {
                          incrementQuantity();
                          setFieldValue('quantity', quantity, false);
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.buttonSection}>
                    <Button
                      onPress={handleSubmit}
                      mode="contained"
                      dark
                      color={BURNT_SIENNA}>
                      Submit
                    </Button>
                  </View>
                </Fragment>
              )}
            </Formik>
            <ActivityIndicator size="small" animating={animating} />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CartFormScreen;

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
  itemCard: {
    margin: 10,
    padding: 10,
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
  inputSection: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  quantityPicker: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  quantityPickerText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  buttonSection: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
