import React from 'react';
import {SafeAreaView, StyleSheet, FlatList, View, Alert} from 'react-native';
import {Card, Paragraph, IconButton, FAB} from 'react-native-paper';
import {PERSIAN_GREEN} from '../../../styles/colours';
import {getAddressBook, deleteAddress} from '../../../services/customer';

const AddressScreen = ({navigation}) => {
  const [addressBook, setAddressBook] = React.useState([]);

  const handleAddAddress = () => {
    navigation.navigate('AddressForm', {
      headerTitle: 'Add Address',
      newAddress: true,
      addressDetails: null,
    });
  };

  const handleEditAddress = oldAddressDetails => {
    console.log('Editing address with postal code', oldAddressDetails.postalcode);
    navigation.navigate('AddressForm', {
      headerTitle: 'Update Address',
      newAddress: false,
      addressDetails: oldAddressDetails
    });
  };

  const handleDeleteAddress = async postalCode => {
    console.log('Deleting address with postal code', postalCode);
    try {
      const results = await deleteAddress(postalCode);
      if (results.success) {
        let updatedAddressBook = addressBook.filter(
          address => address.postalcode !== postalCode,
        );
        setAddressBook(updatedAddressBook);
      } else {
        alert(results.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDeleteAddress = postalCode => {
    Alert.alert(
      'Deleting address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Address delete terminated'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => await handleDeleteAddress(postalCode),
          style: 'default',
        },
      ],
    );
  };

  React.useEffect(() => {
    let isMounted = true;
    getAddressBook()
      .then(results => {
        if (isMounted) {
          if (results.success) setAddressBook(results.data);
        }
      })
      .catch(err => {
        if (isMounted) console.error(err);
      });
    return () => {
      isMounted = false;
    };
  }, [addressBook]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={addressBook}
          keyExtractor={item => item.postalcode}
          renderItem={({item}) => (
            <Card
              key={item.postalcode}
              style={styles.addressCard}
              mode="outlined">
              <Card.Title
                title={item.label}
                subtitle={item.isdefault ? 'DEFAULT' : null}
                subtitleStyle={{fontSize: 12, color: 'blue'}}
              />
              <Card.Content>
                <Paragraph>{item.address}</Paragraph>
                {item.unitnumber !== null && item.unitnumber !== '' ? (
                  <Paragraph>{item.unitnumber}</Paragraph>
                ) : (
                  <></>
                )}
                <Paragraph>{item.postalcode}</Paragraph>
                <Paragraph>{item.city}</Paragraph>
                <Paragraph>{item.country}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <IconButton
                  icon="pencil-outline"
                  color="grey"
                  size={25}
                  onPress={() => handleEditAddress(item)}
                />
                <IconButton
                  icon="delete-outline"
                  color="grey"
                  size={25}
                  onPress={() => confirmDeleteAddress(item.postalcode)}
                />
              </Card.Actions>
            </Card>
          )}
        />
        <FAB
          style={styles.fab}
          color="white"
          icon="plus"
          onPress={handleAddAddress}
        />
      </SafeAreaView>
    </View>
  );
};

export default AddressScreen;

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
  addressCard: {
    margin: 10,
  },
  fab: {
    position: 'absolute',
    backgroundColor: PERSIAN_GREEN,
    margin: 25,
    right: 0,
    bottom: 0,
  },
});
