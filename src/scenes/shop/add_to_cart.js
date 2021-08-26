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
// import * as yup from 'yup';
import {Formik} from 'formik';

const initialFormValues = {
  quantity: 1,
};

// const addItemSchema = yup.object().shape({
//   quantity: yup
//     .number()
//     .required(),
// });

const AddToCartScreen = ({route, navigation}) => {
  const [quantity, setQuantity] = React.useState(initialFormValues.quantity);
  const [animating, setAnimating] = React.useState(false);
  const {productInfo} = route.params;

  const handleAddToCart = () => {
    console.log(
      `Adding ${quantity} of item ${productInfo.productid} to cart...`,
    );
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => setQuantity(quantity + 1);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* <Text>Add to Cart Screen</Text> */}
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
              onSubmit={handleAddToCart}
              //validationSchema={addItemSchema}>
              >
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
                      Add to Cart
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

export default AddToCartScreen;

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
    // backgroundColor: 'white',
    // shadowColor: 'grey',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
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
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityPicker: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // margin: 10,
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
