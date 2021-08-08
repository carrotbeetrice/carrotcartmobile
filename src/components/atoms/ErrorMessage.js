import React from 'react';
import * as Colours from '../../styles/colours';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const ErrorMessage = ({error}) => {
  if (!error) {
    return <></>;
  } else {
    return (
      <View style={styles.errorView}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  errorView: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  errorText: {
    color: Colours.ERROR,
    textAlign: 'left',
  },
});

export default ErrorMessage;
