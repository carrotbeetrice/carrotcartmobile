import React, {useState, Fragment} from 'react';
import * as Colours from '_styles/colours';
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import FormInput from '../../components/atoms/FormInput';
import * as yup from 'yup';
import {Formik} from 'formik';
import {loginUser} from '../../services/auth';

import AuthContext from '../../components/context';

const initialFormValues = {
  email: '',
  password: '',
};

const loginSchema = yup.object().shape({
  email: yup.string().required('Email address is required'),
  password: yup.string().required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(false);

  const {signIn} = React.useContext(AuthContext);

  // Event handlers
  const submitForm = async values => {
    try {
      setAnimating(true);
      Keyboard.dismiss();
      const loginResults = await loginUser(values.email, values.password);

      if (loginResults.success) {
        setTimeout(() => {
          signIn(values.email);
        }, 1000);
      } else {
        alert(loginResults.message);
      }
    } catch (err) {
      console.debug(err);
    } finally {
      setAnimating(false);
    }
  };

  const onSignUpPressed = () => {
    console.log('User signing up');
    navigation.push('Register');
  };

  // TODO: Add reset password functionality
  const onForgotPressed = () => alert('Password forgot');

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <ActivityIndicator
            size="small"
            animating={animating}
            color={Colours.WHITE}
          />
          <View>
            <KeyboardAvoidingView enabled>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.logo}>CarrotCart</Text>
              </View>
              <Formik
                initialValues={initialFormValues}
                onSubmit={values => submitForm(values)}
                validationSchema={loginSchema}>
                {({handleChange, handleSubmit, errors, values}) => (
                  <Fragment>
                    <View style={styles.inputSection}>
                      <FormInput
                        name="email"
                        label="Email"
                        onChangeText={handleChange('email')}
                        keyboardType="email-address"
                        autoCorrect={false}
                        value={values.email}
                      />
                      <ErrorMessage error={errors.email} />
                    </View>
                    <View style={styles.inputSection}>
                      <FormInput
                        name="password"
                        label="Password"
                        onChangeText={handleChange('password')}
                        secureTextEntry
                        value={values.password}
                      />
                      <ErrorMessage error={errors.password} />
                    </View>
                    <Button
                      style={styles.loginButton}
                      color={Colours.BURNT_SIENNA}
                      dark={true}
                      onPress={handleSubmit}
                      uppercase={false}
                      mode="contained">
                      Log In
                    </Button>
                  </Fragment>
                )}
              </Formik>
              <View style={styles.textButtonSection}>
                <Button
                  onPress={onForgotPressed}
                  mode="text"
                  uppercase={false}
                  color="white">
                  Forgot password?
                </Button>
                <Button
                  onPress={onSignUpPressed}
                  mode="text"
                  uppercase={false}
                  color="white">
                  Don't have an account? Sign up
                </Button>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.PERSIAN_GREEN,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 36,
    color: 'white',
    marginBottom: 20,
  },
  inputSection: {
    marginVertical: 20,
  },
  loginButton: {
    marginVertical: 10,
  },
  secondaryButtonText: {
    color: 'white',
  },
  textButtonSection: {
    marginTop: 20,
  },
});
