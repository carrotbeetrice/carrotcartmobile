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

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [animating, setAnimating] = useState(false);
  const [errorText, setErrorText] = useState('');

  const passwordRef = createRef();
  const reenterPasswordRef = createRef();

  const onReturnPressed = () => {
    console.log('Back to log in...');
    // navigation.navigate('Login');
    navigation.pop();
  };

  const onSignUpPressed = () => {
      console.log('Signing up...')
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <TouchableOpacity onPress={onReturnPressed} style={styles.returnButton}>
          <Text style={styles.buttonText}>Return to login screen</Text>
        </TouchableOpacity>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.logo}>Sign Up for Carrot Cart</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor={Colours.PLACEHOLDER}
                onChangeText={text => setEmail(text)}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordRef.current && passwordRef.current.focus()
                }
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                ref={passwordRef}
                style={styles.inputText}
                placeholder="Password"
                placeholderTextColor={Colours.PLACEHOLDER}
                onChangeText={text => setPassword(text)}
                onSubmitEditing={() => {
                  reenterPasswordRef.current &&
                    reenterPasswordRef.current.focus();
                }}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput 
                secureTextEntry
                ref={reenterPasswordRef}
                style={styles.inputText}
                placeholder="Re-enter password"
                placeholderTextColor={Colours.PLACEHOLDER}
                onChangeText={text => setReenterPassword(text)}
              />
            </View>
            <Button
                backgroundColor={Colours.BURNT_SIENNA}
                onButtonPress={onSignUpPressed}
                label="Sign In"
                marginTop={40}
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

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
    fontSize: 32,
    color: Colours.BURNT_SIENNA,
    marginBottom: 20,
    padding: 10,
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
  returnButton: {
    // backgroundColor: Colours.SKOBELOFF,
    borderRadius: 25,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: Colours.WHITE,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
