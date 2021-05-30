import React from 'react';
import * as Colours from '../../styles/colours';
import {View, Text, StyleSheet} from 'react-native';

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
