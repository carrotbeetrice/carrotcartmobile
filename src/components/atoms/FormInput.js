import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import * as Colours from '../../styles/colours';

const FormInput = ({name, placeholder, keyboardType, ...rest}) => (
  <View style={styles.inputView}>
    <TextInput
      {...rest}
      name={name}
      placeholder={placeholder}
      placeholderTextColor={Colours.PLACEHOLDER}
      style={styles.inputText}
      returnKeyType="done"
      keyboardType={keyboardType}
      autoCapitalize="none"
    />
  </View>
);

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    // height: 40,
    // marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  inputText: {
    height: 50,
    flex: 1,
    color: Colours.PLACEHOLDER,
    backgroundColor: Colours.PERSIAN_GREEN,
    paddingHorizontal: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colours.PERSIAN_GREEN,
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
  },
});

export default FormInput;
