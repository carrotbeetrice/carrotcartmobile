import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Colours from '../styles/colours';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Icon name="cart-outline" color={Colours.BURNT_SIENNA} size={100} />
      <ActivityIndicator
        style={styles.activityIndicator}
        animating={true}
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
    backgroundColor: Colours.PERSIAN_GREEN,
  },
  logo: {
    width: '90%',
    margin: 30,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
