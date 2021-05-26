import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Colours from '_styles/colours';
import * as EncryptedStorage from '_utils/encrypted-storage';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      const authToken = EncryptedStorage.getItem('authToken');
      console.log("Token: ", authToken);
      navigation.push(!authToken ? 'Auth' : 'Home');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Icon name="cog" style={styles.logo} color={Colours.BURNT_SIENNA} /> */}
      <Image
        source={{uri: '_assets/images/carrot-solid.svg'}}
        style={styles.logo}
      />
      <ActivityIndicator
        style={styles.activityIndicator}
        animating={animating}
        color={Colours.PERSIAN_GREEN}
        size="large"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.CHARCOAL,
  },
  logo: {
    width: '90%',
    margin: 30,
    // color: Colours.BURNT_SIENNA,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
