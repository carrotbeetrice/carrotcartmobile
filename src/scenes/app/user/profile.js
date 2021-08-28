import React from 'react';
import * as Colours from '../../../styles/colours';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Caption, Card, Title, Button} from 'react-native-paper';
import {getProfile} from '../../../services/customer';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [details, setDetails] = React.useState({});

  const handleTakePhoto = () => navigation.navigate('Camera');

  React.useEffect(() => {
    getProfile()
      .then(results => {
        if (results.success) {
          // console.log('Customer data:', results.data);
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
                <View style={styles.userHeader}>
                  <TouchableOpacity onPress={handleTakePhoto}>
                  {details.profilephotouri !== null &&
                  details.profilephotouri !== '' ? (
                    <Avatar.Image
                      size={60}
                      source={{uri: details.profilephotouri}}
                      style={styles.avatar}
                    />
                  ) : (
                    <Avatar.Icon
                      icon="account"
                      size={60}
                      color={Colours.WHITE}
                      style={styles.avatar}
                    />
                  )}
                  </TouchableOpacity>
 
                  <Title>{details.fullName}</Title>
                </View>
                <View style={styles.profileHeader}>
                  {details.profilephotouri !== null &&
                  details.profilephotouri !== '' ? (
                    <Avatar.Image
                      size={60}
                      source={{uri: details.profilephotouri}}
                      style={styles.avatar}
                    />
                  ) : (
                    <Avatar.Icon
                      icon="account"
                      size={60}
                      color={Colours.WHITE}
                      style={styles.avatar}
                    />
                  )}

                  <View style={styles.profileHeaderText}>
                    <Title style={styles.fullName}>{details.fullName}</Title>
                    <Text style={styles.username}>@{details.username}</Text>
                    <Text style={styles.joinedOn}>
                      Member since {details.joinedon.substring(0, 10)}
                    </Text>
                  </View>
                </View>
                <View style={styles.detailsSection}>
                  <Text>Bio</Text>
                  <Text>{details.bio}</Text>
                </View>
                <View style={styles.detailsSection}>
                  <Text>Birthday</Text>
                  <Text>{details.birthday.substring(0, 10)}</Text>
                </View>
                <View style={styles.detailsSection}>
                  <Text>Mobile number</Text>
                  <Text>{details.mobileNumber}</Text>
                </View>
                <View style={styles.detailsSection}></View>
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
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  userHeader: {
    // margin: 10,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 15,
  },
  profileHeader: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 15,
  },
  avatar: {
    backgroundColor: Colours.BURNT_SIENNA,
    // alignSelf: 'flex-start'
  },
  profileHeaderText: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  fullName: {
    fontSize: 16,
    // marginTop: 3,
    // fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  joinedOn: {
    fontSize: 14,
  },
  detailsSection: {
    marginVertical: 10,
  },
  detailsText: {},
  actions: {},
});
