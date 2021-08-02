import React from 'react';
import {
  SafeAreaView,
  View,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Colours from '../../styles/colours';
import {getWishlist} from '../../services/wishlist';

const WishlistScreen = ({navigation}) => {
  const [animating, setAnimating] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  // const [refreshing, setRefreshing] = React.useState(false);
  const [wishlist, setWishlist] = React.useState([]);

  // const onRefresh = React.useCallback(async () => {
  //   setAnimating(true);
  //   try {
  //     const results = await getWishlist();
  //     if (results.success) setWishlist(results.data);
  //     else console.log(results.message);
  //   } catch(err) {
  //     console.error(err);
  //   } finally {
  //     setAnimating(false);
  //   }
  // });

  React.useEffect(() => {
    getWishlist()
      .then(results => {
        if (results.success) setWishlist(results.data);
        else console.log(results.message);
      })
      .catch(err => console.error(err))
      .finally(() => setAnimating(false));
  }, [wishlist]);

  const onProductPress = productId => {
    console.log('Product selected:', productId);
    navigation.navigate('Product', {
      productId: productId,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Hello there</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text>Hide modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {animating ? (
          <ActivityIndicator size="large" color={Colours.PERSIAN_GREEN} />
        ) : wishlist.length === 0 ? (
          <View style={styles.emptyWishlistSection}>
            <Text>Your wishlist is empty. Start shopping now!</Text>
            <Icon name="cart" size={50} color={Colours.PERSIAN_GREEN}/>
          </View>
        ) : (
          <FlatList
            data={wishlist}
            renderItem={({item}) => (
              <TouchableOpacity
                key={item.productid}
                onPress={() => onProductPress(item.productid)}>
                <Card style={styles.itemCard}>
                  <Card.Cover
                    style={styles.itemImage}
                    source={{uri: item.image}}
                    resizeMode="contain"
                  />
                  <Card.Content>
                    <Title style={styles.itemNameText}>{item.title}</Title>
                    <Paragraph style={styles.itemPriceText}>
                      ${item.price}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.productid}
            // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
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
  },
  itemImage: {
    padding: 10,
    backgroundColor: 'white',
  },
  itemNameText: {
    fontSize: 16,
  },
  itemPriceText: {
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  emptyWishlistSection: {
    alignItems: 'center'
  },
});
