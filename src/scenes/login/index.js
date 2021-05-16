import React from 'react';
import {useState} from 'react';
import * as Colours from '_styles/colours';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const credentials = {
  email: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.CHARCOAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: Colours.BURNT_SIENNA,
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: Colours.PERSIAN_GREEN,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: Colours.PLACEHOLDER,
  },
  forgot: {
    color: Colours.WHITE,
    fontSize: 11,
  },
  loginButton: {
    width: '80%',
    backgroundColor: Colours.BURNT_SIENNA,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: Colours.WHITE,
  },
});

const LoginScreen = () => {
  const [loginCredentials, setLoginCredentials] = useState(credentials);
  const [token, setToken] = useState(null);

  // Event handlers

  const onLoginPressed = () => console.log(loginCredentials);

  const onSignUpPressed = () => console.log("User signing up");

  const onForgotPressed = () => console.log("Password forgot");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CarrotCart</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor={Colours.PLACEHOLDER}
          onChangeText={text => setLoginCredentials({...loginCredentials, email: text})}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor={Colours.PLACEHOLDER}
          onChangeText={text => setLoginCredentials({...loginCredentials, password: text})
          }
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot} onPress={onForgotPressed}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={onLoginPressed}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSignUpPressed}>
        <Text style={styles.loginText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
