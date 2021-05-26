import React from 'react';
import {useState} from 'react';
import * as Colours from '_styles/colours';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Button} from '_atoms';
import {createRef} from 'react';
import {loginUser} from '../services/auth';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animating, setAnimating] = useState(false);
  // const [errorText, setErrorText] = useState('');

  const passwordInputRef = createRef();

  // Event handlers
  const onLoginPressed = () => {
    setAnimating(true);
    // setErrorText('');
    if (!email) {
      alert('Email required');
      setAnimating(false);
      return;
    }
    if (!password) {
      alert('Password required');
      setAnimating(false);
      return;
    }
    loginUser(email, password)
      .then(loginResults => {
        Toast.show({
          type: loginResults.success ? 'success' : 'error',
          position: 'top',
          text1: loginResults.success ? 'Success' : 'Log in failed',
          text2: loginResults.message,
        });
        setAnimating(false);
      })
      .catch(err => console.error(err));
  };

  const onSignUpPressed = () => {
    console.log('User signing up');
    navigation.push('Register');
  };

  const onForgotPressed = () => console.log('Password forgot');

  return (
    <View style={styles.container}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.logo}>CarrotCart</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                keyboardType="email-address"
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor={Colours.PLACEHOLDER}
                onChangeText={text => setEmail(text)}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                ref={passwordInputRef}
                style={styles.inputText}
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor={Colours.PLACEHOLDER}
                onChangeText={text => setPassword(text)}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                backgroundColor={Colours.BURNT_SIENNA}
                onButtonPress={onLoginPressed}
                label="Log In"
              />
              <Button
                backgroundColor={Colours.SKOBELOFF}
                onButtonPress={onSignUpPressed}
                label="Sign Up"
              />
            </View>
            <Button
              backgroundColor={null}
              onButtonPress={onForgotPressed}
              label="Forgot Password?"
              marginTop={10}
            />
            <ActivityIndicator
              size="small"
              animating={animating}
              color={Colours.WHITE}
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.CHARCOAL,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 36,
    color: Colours.BURNT_SIENNA,
    marginBottom: 20,
  },
  inputView: {
    flexDirection: 'row',
    height: 40,
    marginBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  inputText: {
    height: 50,
    flex: 1,
    color: Colours.PLACEHOLDER,
    backgroundColor: Colours.PERSIAN_GREEN,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colours.PERSIAN_GREEN,
  },
  buttonView: {
    width: '80%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'center',
    // marginVertical: 40,
  },
});
