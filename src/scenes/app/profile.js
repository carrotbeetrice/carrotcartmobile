import React from 'react';
import * as Colours from '../../styles/colours';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Avatar, Caption, Card, Title} from 'react-native-paper';
import {getProfile} from '../../services/customer';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [details, setDetails] = React.useState({});

  React.useEffect(() => {
    getProfile()
      .then(results => {
        if (results.success) {
          console.log('Customer data:', results.data);
          setDetails(results.data);
        } else console.debug(results.message);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.profile}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <View>
                <View style={styles.profileHeader}>
                  <Avatar.Icon
                    icon="account"
                    size={60}
                    color={Colours.WHITE}
                    style={styles.avatar}
                  />
                  <View style={styles.profileHeaderText}>
                    <Title style={styles.fullName}>{details.fullName}</Title>
                    <Text style={styles.joinedOn}>
                      Member since {details.joinedon.substring(0, 10)}
                    </Text>
                  </View>
                </View>
                <View style={styles.mobileNumber}>
                  <Text>Mobile number</Text>
                  <Text>{details.mobileNumber}</Text>
                </View>
                <View style={styles.addressBook}>
                  <Text>Addresses</Text>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  profile: {
    // flexDirection: 'row',
    // marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  profileHeader: {
    marginVertical: 10,
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  avatar: {
    backgroundColor: Colours.BURNT_SIENNA,
  },
  profileHeaderText: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  fullName: {
    fontSize: 14,
    // marginTop: 3,
    fontWeight: 'bold',
  },
  joinedOn: {
    fontSize: 12,
  },
  mobileNumber: {
    marginVertical: 10,
  },
  addressBook: {
    marginVertical: 10,
  },
  actions: {},
});
