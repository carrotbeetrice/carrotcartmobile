import React, {useState, Fragment} from 'react';
import * as Colours from '_styles/colours';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Button from '../components/atoms/Button';
import ErrorMessage from '../components/atoms/ErrorMessage';
import FormInput from '../components/atoms/FormInput';
import * as yup from 'yup';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import {registerUser} from '../services/auth';

import AuthContext from '../components/context';

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
    setAnimating(true);
    Keyboard.dismiss();
    console.log(values);
    registerUser(values.email, values.password)
      .then(loginResults => {
        Toast.show({
          type: loginResults.success ? 'success' : 'error',
          position: 'top',
          text1: loginResults.success
            ? 'Registration success!'
            : 'Registration failed',
          text2: loginResults.message,
        });
        setAnimating(false);
        signUp();
      })
      .catch(err => console.error(err))
      .finally(() => {
        setAnimating(false);
        signUp();
      });
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
          <Toast ref={ref => Toast.setRef(ref)} />
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
                {({handleChange, handleSubmit, errors}) => (
                  <Fragment>
                    <FormInput
                      name="email"
                      placeholder="Email"
                      onChangeText={handleChange('email')}
                      keyboardType="email-address"
                      autoCorrect={false}
                    />
                    <ErrorMessage error={errors.email} />
                    <FormInput
                      name="password"
                      placeholder="Password"
                      onChangeText={handleChange('password')}
                      secureTextEntry
                    />
                    <ErrorMessage error={errors.password} />
                    <FormInput
                      name="reenterPassword"
                      placeholder="Re-enter password"
                      onChangeText={handleChange('reenterPassword')}
                      secureTextEntry
                    />
                    <ErrorMessage error={errors.reenterPassword} />
                    <Button
                      backgroundColor={Colours.BURNT_SIENNA}
                      onButtonPress={handleSubmit}
                      label="Sign Up"
                      marginTop={20}
                    />
                  </Fragment>
                )}
              </Formik>
              <Button
                onButtonPress={onReturnPressed}
                label="Already have an account? Log in here"
              />
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
    backgroundColor: Colours.CHARCOAL,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logo: {
    // fontWeight: 'bold',
    fontSize: 32,
    color: Colours.BURNT_SIENNA,
    marginBottom: 20,
    padding: 10,
  },
});
