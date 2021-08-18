import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import {
  Card,
  Paragraph,
  IconButton,
  FAB,
} from 'react-native-paper';
import {PERSIAN_GREEN} from '../../../styles/colours';
import {getAddressBook} from '../../../services/customer';

const AddressScreen = ({navigation}) => {
  const [addressBook, setAddressBook] = React.useState([]);

  const addAddress = () => navigation.navigate('NewAddress')

  const editAddress = () => console.log('TODO: Editing address');

  const deleteAddress = () => console.log('TODO: Deleting address');

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
                  onPress={() => editAddress()}
                />
                <IconButton
                  icon="delete-outline"
                  color="grey"
                  size={25}
                  onPress={() => deleteAddress()}
                />
              </Card.Actions>
            </Card>
          )}
        />
        <FAB
          style={styles.fab}
          color="white"
          icon="plus"
          onPress={addAddress}
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
    marginVertical: 10,
  },
  fab: {
    position: 'absolute',
    backgroundColor: PERSIAN_GREEN,
    margin: 25,
    right: 0,
    bottom: 0,
  },
});
