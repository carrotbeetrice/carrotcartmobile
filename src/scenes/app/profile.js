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
          console.log(results.data);
          setDetails(results.data);
        } else console.log(results.message);
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
                <Avatar.Icon
                  icon="account"
                  size={50}
                  color={Colours.WHITE}
                  style={styles.avatar}
                />
                <View style={styles.username}>
                  <Title style={styles.title}>John Doe</Title>
                  <Caption style={styles.caption}>@johndoe</Caption>
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
  avatar: {
    backgroundColor: Colours.BURNT_SIENNA,
  },
  username: {
    marginLeft: 15,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  profile: {
    // flexDirection: 'row',
    // marginTop: 15,
    // paddingVertical: 12,
    // paddingHorizontal: 16,
  },
  actions: {},
});
