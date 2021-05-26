import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button = ({
  backgroundColor,
  onButtonPress,
  label,
  marginTop = 0,
  marginBottom = 0,
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: backgroundColor,
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      marginHorizontal: 35,
      marginTop: marginTop,
      marginBottom: marginBottom,
    },
    label: {
      color: 'white',
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onButtonPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
