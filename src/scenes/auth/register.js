import React, {useState, Fragment} from 'react';
import * as Colours from '../../styles/colours';
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

import AuthContext from '../../components/context';

const initialFormValues = {
  email: '',
  password: '',
  reenterPassword: '',
};

const registrationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email address is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .required('Password is required'),
  reenterPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Re-enter password is required'),
});

const RegisterScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(false);

  const {signUp} = React.useContext(AuthContext);

  const onReturnPressed = () => {
    console.log('Back to log in...');
    navigation.pop();
  };

  const submitForm = values => {
    try {
      setAnimating(true);
      Keyboard.dismiss();
      console.log('Next step of registration...');
      navigation.push('OnBoarding', {
        email: values.email,
        password: values.password,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setAnimating(false);
    }
  };

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
                <Text style={styles.logo}>Sign Up for Carrot Cart</Text>
              </View>
              <Formik
                initialValues={initialFormValues}
                onSubmit={values => submitForm(values)}
                validationSchema={registrationSchema}>
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
                    <View style={styles.inputSection}>
                      <FormInput
                        name="reenterPassword"
                        label="Re-enter password"
                        onChangeText={handleChange('reenterPassword')}
                        secureTextEntry
                        value={values.reenterPassword}
                      />
                      <ErrorMessage error={errors.reenterPassword} />
                    </View>
                    <Button
                      style={styles.signUpButton}
                      color={Colours.BURNT_SIENNA}
                      dark={true}
                      onPress={handleSubmit}
                      uppercase={false}
                      mode="contained">
                      Sign Up
                    </Button>
                  </Fragment>
                )}
              </Formik>
              <Button
                onPress={onReturnPressed}
                mode="text"
                uppercase={false}
                color="white">
                Already have an account? Log in here
              </Button>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;

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
    fontSize: 32,
    color: 'white',
    marginBottom: 20,
    padding: 10,
  },
  signUpButton: {
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  inputSection: {
    marginVertical: 15,
  },
});
