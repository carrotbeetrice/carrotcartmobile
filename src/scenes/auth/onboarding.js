import React, {useState, Fragment} from 'react';
import * as Colours from '../../styles/colours';
import {
  Alert,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import FormInput from '../../components/atoms/FormInput';
import * as yup from 'yup';
import {Formik} from 'formik';

import AuthContext from '../../components/context';
import {registerUser, createNewUser} from '../../services/auth';

const initialFormValues = {
  username: '',
  fullName: '',
  mobileNumber: '',
};

const onBoardingSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  fullName: yup.string().required('Full name is required'),
  mobileNumber: yup.string().required('Mobile number is required'),
});

const OnBoardingScreen = ({route, navigation}) => {
  const [animating, setAnimating] = useState(false);
  const {email, password} = route.params;

  const {signUp} = React.useContext(AuthContext);

  const onBackPressed = () => navigation.pop();

  const submitForm = async userDetails => {
    console.log('Form values:', userDetails);
    setAnimating(true);

    try {
      const registerResults = await registerUser(email, password);

      if (!registerResults.success) {
        alert(registerResults.message);
      } else {
        const createProfileResults = await createNewUser(userDetails);

        if (!createProfileResults.success) {
          alert(createProfileResults.message);
        } else {
          setAnimating(false);
          Alert.alert('Registration successful!', 'Welcome to CarrotCart', [
            {
              text: 'Proceed to app',
              onPress: () => {
                setTimeout(() => {
                  signUp();
                }, 1000);
              },
            },
          ]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (email == null || password == null) {
      console.error('Email and/or password missing');
    }
  }, []);

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
          <ActivityIndicator size="small" animating={animating} color="white" />
          <View>
            <KeyboardAvoidingView>
              <Text style={styles.logo}>OnBoarding Screen</Text>
              <Formik
                initialValues={initialFormValues}
                onSubmit={values => submitForm(values)}
                validationSchema={onBoardingSchema}>
                {({handleChange, handleSubmit, errors, values}) => (
                  <Fragment>
                    <View style={styles.inputSection}>
                      <FormInput
                        name="username"
                        label="Username"
                        onChangeText={handleChange('username')}
                        autoCorrect={false}
                        value={values.username}
                      />
                      <ErrorMessage error={errors.username} />
                    </View>
                    <View style={styles.inputSection}>
                      <FormInput
                        name="fullName"
                        label="Full Name"
                        onChangeText={handleChange('fullName')}
                        autoCorrect={false}
                        value={values.fullName}
                      />
                      <ErrorMessage error={errors.fullName} />
                    </View>
                    <View style={styles.inputSection}>
                      <FormInput
                        name="mobileNumber"
                        label="Mobile Number"
                        onChangeText={handleChange('mobileNumber')}
                        keyboardType="phone-pad"
                        value={values.mobileNumber}
                      />
                      <ErrorMessage error={errors.mobileNumber} />
                    </View>
                    <Button
                      style={styles.submitButton}
                      color={Colours.BURNT_SIENNA}
                      onPress={handleSubmit}
                      mode="contained"
                      dark={true}>
                      Submit
                    </Button>
                  </Fragment>
                )}
              </Formik>
              <Button
                onPress={onBackPressed}
                mode="text"
                uppercase={false}
                color="white">
                Back
              </Button>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.PERSIAN_GREEN,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 32,
    color: 'white',
    marginBottom: 20,
    padding: 10,
  },
  inputLabel: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  inputSection: {
    marginVertical: 10,
  },
  submitButton: {
    marginTop: 20,
  },
});
