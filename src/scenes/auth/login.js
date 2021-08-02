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
import {Button} from '_atoms';
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
      alert(loginResults.message);
      if (loginResults.success) {
        setTimeout(() => {
          signIn(values.email);
        }, 1000);
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
  const onForgotPressed = () => console.log('Password forgot');

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
                    <Button
                      onButtonPress={onForgotPressed}
                      label="Forgot Password?"
                    />
                    <Button
                      backgroundColor={Colours.BURNT_SIENNA}
                      onButtonPress={handleSubmit}
                      label="Log In"
                      marginTop={30}
                    />
                  </Fragment>
                )}
              </Formik>
              <Button
                onButtonPress={onSignUpPressed}
                label="Don't have an account? Sign up"
              />
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
    backgroundColor: Colours.CHARCOAL,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logo: {
    // fontWeight: 'bold',
    fontSize: 36,
    color: Colours.BURNT_SIENNA,
    marginBottom: 20,
  },
  inputView: {
    flexDirection: 'row',
    height: 40,
    marginBottom: 20,
    paddingTop: 20,
    // paddingHorizontal: 15,
  },
  inputText: {
    height: 50,
    flex: 1,
    color: Colours.KOBE,
    backgroundColor: Colours.PERSIAN_GREEN,
    paddingHorizontal: 15,
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
