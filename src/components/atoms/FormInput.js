import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const FormInput = ({name, keyboardType, label = '', ...rest}) => (
  <TextInput
    {...rest}
    name={name}
    label={label}
    mode="outlined"
    style={styles.inputText}
    returnKeyType="done"
    keyboardType={keyboardType}
    autoCapitalize="none"
  />
);

const styles = StyleSheet.create({
  inputText: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
  },
});

export default FormInput;
